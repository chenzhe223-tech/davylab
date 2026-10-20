import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = process.cwd();
const OPS = path.join(ROOT, 'wechat-ops');
const DRAFTS = path.join(OPS, 'drafts');
const TYPES = {
  article: 'article.md',
  image_post: 'image-post.md',
  video: 'video.md',
  podcast: 'podcast.md'
};
const errors = [];
const warnings = [];
const fail = (message, target = errors) => target.push(message);
const exists = (file) => fs.existsSync(file);
const readJson = (file, target = errors) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail('Invalid JSON at ' + path.relative(ROOT, file) + ': ' + error.message, target);
    return null;
  }
};

function safeLocalPath(base, value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) return null;
  if (path.isAbsolute(value)) return null;
  const resolved = path.resolve(base, value);
  const relative = path.relative(base, resolved);
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) return null;
  return resolved;
}

function validateAsset(base, asset, label, target = errors) {
  if (!asset || typeof asset !== 'object') {
    fail(label + ' is missing.', target);
    return;
  }
  if (typeof asset.url === 'string' && asset.url.trim()) {
    try {
      const parsed = new URL(asset.url);
      if (parsed.protocol !== 'https:') fail(label + ' URL must use HTTPS.', target);
      else fail(label + ' URL syntax is valid; verify access, file version, permissions and expiry manually before handoff.', warnings);
    } catch {
      fail(label + ' URL is invalid.', target);
    }
    return;
  }
  const local = safeLocalPath(base, asset.path);
  if (!local || !exists(local) || !fs.statSync(local).isFile()) {
    fail(label + ' local file is missing or the path is unsafe.', target);
  }
}

function validatePackage(manifest, base, label, target = errors) {
  if (!manifest || typeof manifest !== 'object') {
    fail(label + ' manifest is not an object.', target);
    return;
  }
  if (!Object.hasOwn(TYPES, manifest.content_type)) {
    fail(label + ' unsupported content_type.', target);
    return;
  }
  if (manifest.brand !== 'DAVYLAB') fail(label + ' brand must be DAVYLAB.', target);
  if (manifest.human_approval_required !== true) fail(label + ' human_approval_required must be true.', target);
  if (manifest.auto_publish_allowed !== false) fail(label + ' auto_publish_allowed must be false.', target);
  if (manifest.publish_mode !== 'save_draft_only') fail(label + ' publish_mode must be save_draft_only.', target);
  if (!['draft-prepared', 'ready-for-workbuddy', 'draft-saved-in-wechat', 'human-reviewed', 'published-by-human', 'blocked'].includes(manifest.status)) {
    fail(label + ' unknown status.', target);
    return;
  }
  if (!Array.isArray(manifest.review_blockers)) fail(label + ' review_blockers must be an array.', target);
  if (manifest.status !== 'ready-for-workbuddy') return;

  for (const field of ['title', 'author', 'column']) {
    if (typeof manifest[field] !== 'string' || !manifest[field].trim()) fail(label + ' ready-for-workbuddy requires ' + field + '.', target);
  }
  if (Array.isArray(manifest.review_blockers) && manifest.review_blockers.length) fail(label + ' cannot hand off while review_blockers remain.', target);
  if (manifest.body_file !== TYPES[manifest.content_type]) fail(label + ' body_file does not match content_type; expected ' + TYPES[manifest.content_type] + '.', target);

  for (const field of ['body_file', 'review_file', 'sources_file']) {
    const file = safeLocalPath(base, manifest[field]);
    if (!file || !exists(file) || !fs.statSync(file).isFile()) fail(label + ' ' + field + ' is missing or unsafe.', target);
    else if (fs.statSync(file).size === 0) fail(label + ' ' + field + ' is empty.', target);
  }

  if (manifest.content_type === 'article') {
    validateAsset(base, manifest.assets?.cover, label + ' article cover', target);
  }

  if (manifest.content_type === 'image_post') {
    const images = manifest.assets?.images;
    if (!Array.isArray(images) || images.length < 1) {
      fail(label + ' image_post requires at least one image.', target);
    } else {
      images.forEach((asset, index) => {
        validateAsset(base, asset, label + ' image ' + (index + 1), target);
        if (asset?.order !== index + 1) fail(label + ' image order must be consecutive and start at 1.', target);
        if (typeof asset?.caption !== 'string' || !asset.caption.trim()) fail(label + ' image ' + (index + 1) + ' needs a caption.', target);
        if (typeof asset?.alt !== 'string' || !asset.alt.trim()) fail(label + ' image ' + (index + 1) + ' needs alt text.', target);
      });
    }
    if (manifest.metadata?.image_post?.order_reviewed !== true) fail(label + ' image order must be reviewed.', target);
    validateAsset(base, manifest.assets?.cover, label + ' image post cover', target);
  }

  if (manifest.content_type === 'video') {
    validateAsset(base, manifest.assets?.video, label + ' final video file', target);
    validateAsset(base, manifest.assets?.cover, label + ' video cover', target);
    if (!Number.isFinite(manifest.assets?.video?.duration_seconds) || manifest.assets.video.duration_seconds <= 0) {
      fail(label + ' final video duration_seconds must be a verified positive number.', target);
    }
    if (typeof manifest.assets?.video?.aspect_ratio !== 'string' || !manifest.assets.video.aspect_ratio.trim()) {
      fail(label + ' video aspect_ratio must be recorded.', target);
    }
  }

  if (manifest.content_type === 'podcast') {
    validateAsset(base, manifest.assets?.audio, label + ' final podcast audio', target);
    validateAsset(base, manifest.assets?.cover, label + ' podcast cover', target);
    if (!Number.isFinite(manifest.assets?.audio?.duration_seconds) || manifest.assets.audio.duration_seconds <= 0) {
      fail(label + ' audio duration_seconds must be a verified positive number.', target);
    }
    const transcript = safeLocalPath(base, manifest.assets?.transcript_file);
    if (!transcript || !exists(transcript) || !fs.statSync(transcript).isFile() || fs.statSync(transcript).size === 0) {
      fail(label + ' podcast transcript_file is missing, empty or unsafe.', target);
    }
  }

  if (/\p{Cc}/u.test(String(manifest.title || ''))) fail(label + ' title contains control characters.', target);
}

function checkRepository() {
  const schema = readJson(path.join(OPS, 'templates', 'content-package.schema.json'));
  const template = readJson(path.join(OPS, 'templates', 'publish.json'));
  if (!schema || schema.properties?.content_type?.enum?.join(',') !== Object.keys(TYPES).join(',')) {
    fail('Schema must list article, image_post, video and podcast.');
  }
  if (template) {
    if (template.schema_version !== '2.0') fail('Starter publish.json must use schema_version 2.0.');
    if (!Object.hasOwn(TYPES, template.content_type)) fail('Starter content_type must be supported.');
    if (template.human_approval_required !== true) fail('Starter human_approval_required must remain true.');
    if (template.auto_publish_allowed !== false) fail('Starter auto_publish_allowed must remain false.');
    if (template.publish_mode !== 'save_draft_only') fail('Starter publish_mode must remain save_draft_only.');
  }
  for (const file of [...Object.values(TYPES), 'review.md', 'sources.md']) {
    const target = path.join(OPS, 'templates', file);
    if (!exists(target)) fail('Missing content template: ' + path.relative(ROOT, target));
  }
  if (!exists(DRAFTS)) {
    fail('Missing drafts directory: ' + path.relative(ROOT, DRAFTS));
    return;
  }
  let checked = 0;
  for (const dir of fs.readdirSync(DRAFTS, { withFileTypes: true }).filter(item => item.isDirectory())) {
    const base = path.join(DRAFTS, dir.name);
    const manifestFile = path.join(base, 'publish.json');
    if (!exists(manifestFile)) {
      fail('Draft package directory ' + dir.name + ' has no publish.json.', warnings);
      continue;
    }
    const manifest = readJson(manifestFile);
    if (manifest) {
      validatePackage(manifest, base, dir.name);
      checked++;
    }
  }
  return checked;
}

function runSelfTests() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'davylab-wechat-content-'));
  const testErrors = [];
  const write = (base, name, content = 'fixture') => {
    const target = path.join(base, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  };
  try {
    for (const [type, body] of Object.entries(TYPES)) {
      const base = path.join(temp, type);
      fs.mkdirSync(base, { recursive: true });
      write(base, body, '# fixture content');
      write(base, 'review.md', '# review');
      write(base, 'sources.md', '# sources');
      write(base, 'cover.png');
      write(base, 'image.png');
      write(base, 'media.mp4');
      write(base, 'episode.mp3');
      write(base, 'transcript.md');
      const manifest = {
        brand: 'DAVYLAB', content_type: type, title: 'fixture title', author: 'DAVYLAB', column: 'test',
        body_file: body, review_file: 'review.md', sources_file: 'sources.md',
        status: 'ready-for-workbuddy', review_blockers: [], publish_mode: 'save_draft_only',
        human_approval_required: true, auto_publish_allowed: false,
        assets: {
          cover: { path: 'cover.png' },
          images: [{ path: 'image.png', order: 1, caption: 'fixture caption', alt: 'fixture alt' }],
          video: { path: 'media.mp4', duration_seconds: 60, aspect_ratio: '9:16' },
          audio: { path: 'episode.mp3', duration_seconds: 180 },
          transcript_file: 'transcript.md'
        },
        metadata: { image_post: { order_reviewed: true } }
      };
      const before = testErrors.length;
      validatePackage(manifest, base, 'self-test ' + type, testErrors);
      if (testErrors.length > before) fail('Self-test failed for valid ' + type + ' package: ' + testErrors.slice(before).join('; '), errors);
    }
    const invalidBase = path.join(temp, 'invalid-video');
    fs.mkdirSync(invalidBase, { recursive: true });
    write(invalidBase, 'video.md', '# body');
    write(invalidBase, 'review.md', '# review');
    write(invalidBase, 'sources.md', '# sources');
    const invalid = {
      brand: 'DAVYLAB', content_type: 'video', title: 'invalid video', author: 'DAVYLAB', column: 'test',
      body_file: 'video.md', review_file: 'review.md', sources_file: 'sources.md',
      status: 'ready-for-workbuddy', review_blockers: [], publish_mode: 'save_draft_only',
      human_approval_required: true, auto_publish_allowed: false,
      assets: { cover: { path: 'missing-cover.png' }, video: { path: 'missing-video.mp4', duration_seconds: 0, aspect_ratio: '' } }
    };
    const invalidResult = [];
    validatePackage(invalid, invalidBase, 'self-test invalid video', invalidResult);
    if (invalidResult.length < 3) fail('Self-test failed to block missing/invalid video assets.');
    if (errors.length) {
      console.error('Self-test FAILED:');
      for (const error of errors) console.error(' - ' + error);
      process.exitCode = 1;
    } else {
      console.log('Self-test PASSED: four valid content types accepted; invalid video package rejected.');
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (process.argv.includes('--self-test')) runSelfTests();
else {
  const checked = checkRepository();
  if (errors.length) {
    console.error('DAVYLAB WeChat content validation FAILED:');
    for (const error of errors) console.error(' - ' + error);
    process.exitCode = 1;
  } else {
    console.log('DAVYLAB WeChat content validation PASSED.');
    console.log('Supported types: ' + Object.keys(TYPES).join(', '));
    console.log('Draft packages checked: ' + checked);
  }
  for (const warning of warnings) console.warn('WARN: ' + warning);
}
