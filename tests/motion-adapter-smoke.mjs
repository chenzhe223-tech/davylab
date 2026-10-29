import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("skills/visual-dna-motion/assets/davylab-motion.js", "utf8");
let reducedMotion = false;
const targets = [];
function makeTarget() {
  const target = {
    nodeType: 1,
    calls: [],
    animate(keyframes, options) {
      const animation = {
        keyframes,
        options,
        cancelled: false,
        cancel() { this.cancelled = true; }
      };
      this.calls.push(animation);
      return animation;
    }
  };
  targets.push(target);
  return target;
}
const first = makeTarget();
const second = makeTarget();
const third = makeTarget();
const fakeDocument = {
  querySelectorAll(selector) {
    return selector === ".items" ? [first, second, third] : [first];
  },
  addEventListener() {},
  removeEventListener() {},
  hidden: false
};
const fakeWindow = {
  document: fakeDocument,
  matchMedia() { return { matches: reducedMotion }; }
};
vm.runInNewContext(source, { window: fakeWindow });
const api = fakeWindow.DAVYLABMotion;
assert.equal(api.version, "0.2.0");
assert.equal(typeof api.applyPreset, "function");

const base = {
  schema: "davylab.visual-dna-motion/v1",
  durationMs: 1800,
  intensityPercent: 100,
  distancePx: 32,
  direction: "left",
  easing: "cubic-bezier(0.22,1,0.36,1)",
  playback: "once",
  globalTokens: { staggerMs: 80 }
};

for (const effect of ["fade-up", "spring", "slide", "blur", "stagger", "orbit"]) {
  const target = makeTarget();
  const cleanup = api.applyPreset(target, { ...base, effect });
  assert.equal(target.calls.length, 1, effect + " should start one animation");
  assert.equal(target.calls[0].options.duration, 1800, effect + " duration should match config");
  assert.equal(target.calls[0].options.iterations, 1, effect + " should play once by default");
  cleanup();
  assert.equal(target.calls[0].cancelled, true, effect + " cleanup should cancel its animation");
}

[first, second, third].forEach(target => { target.calls = []; });
const cleanupStagger = api.applyPreset(".items", { ...base, effect: "stagger" });
assert.equal(first.calls[0].options.delay, 0);
assert.equal(second.calls[0].options.delay, 80);
assert.equal(third.calls[0].options.delay, 160);
cleanupStagger();

const loopTarget = makeTarget();
api.applyPreset(loopTarget, { ...base, effect: "orbit", playback: "loop" });
assert.equal(loopTarget.calls[0].options.duration, 900);
assert.equal(loopTarget.calls[0].options.iterations, 2);

reducedMotion = true;
const reducedTarget = makeTarget();
api.applyPreset(reducedTarget, { ...base, effect: "fade-up" });
assert.equal(reducedTarget.calls.length, 0, "reduced-motion must suppress non-essential animation");

console.log("PASS: JSON preset adapter supports all six effects, stagger timing, loop duration, cleanup, and reduced motion.");
