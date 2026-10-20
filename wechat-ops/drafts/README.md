# DAVYLAB 公众号内容包交接目录

每篇/期内容使用独立目录，例如：
- YYYY-MM-DD-dashboard-studio-lessons/
- YYYY-MM-DD-ai-tool-image-post/
- YYYY-MM-DD-build-demo-video/
- YYYY-MM-DD-ai-creator-podcast/

每个目录至少包含 publish.json、对应主文件（article.md / image-post.md / video.md / podcast.md）、review.md 和 sources.md，以及相应的封面、图片、最终视频/音频、字幕或文字稿。

大型媒体文件放在用户批准的受控存储，在 publish.json 记录 HTTPS 地址、权限、有效期、版本及实际验证结果。不要将大媒体文件、凭证或临时认证链接盲目提交到 GitHub。

交给 WorkBuddy 前，用户需确认内容形式与内容；review_blockers 为空；状态为 ready-for-workbuddy；node scripts/validate-wechat-content.mjs 通过；human_approval_required=true 且 auto_publish_allowed=false。

WorkBuddy 只保存草稿。正式发布由用户本人在公众号后台手动完成。
