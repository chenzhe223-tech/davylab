# Visual DNA Motion System

A reusable motion system for DAVYLAB products, built around three complementary engines:

- **GSAP** for scroll choreography, timelines and multi-element sequences.
- **Motion for React** for React component transitions, layout changes and gestures.
- **Three.js** for purposeful interactive 3D scenes.
- **CSS** remains the default for simple hover, focus and pressed states.

The engines are complementary, not mandatory dependencies. A static HTML site should not add React just to use Motion, and most screens do not need Three.js.

## Contents

- [Skill instructions](SKILL.md)
- [Motion tokens](assets/motion-tokens.css)
- [Framework-neutral GSAP adapter](assets/davylab-motion.js)
- [Interactive Motion Lab](https://chenzhe223-tech.github.io/motion-lab/)

## Quick start: static HTML

Load GSAP and ScrollTrigger before the adapter, then opt into animations explicitly:

```html
<link rel="stylesheet" href="./assets/motion-tokens.css">
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script defer src="./assets/davylab-motion.js"></script>
```

```js
// Call after the DOM is ready. Content is not hidden by the adapter automatically.
const cleanup = DAVYLABMotion.scope(document.querySelector("#about"), (gsap) => {
  DAVYLABMotion.scrollReveal("#about .section-title", { y: 14, duration: 0.5 });
  // Build scoped GSAP timelines here. Return cleanup for non-GSAP resources if needed.
});

// When the owning view is removed:
cleanup();
```

The helper does not auto-hide page content or automatically animate every element. Use explicit selectors so a CDN failure leaves the page readable. For long-lived SPA routes, call the returned cleanup when a view unmounts and ensure any ScrollTriggers created outside a GSAP context are killed.

## React applications

Install Motion only in a React project where it is needed:

```bash
npm install motion
```

```jsx
import { motion, AnimatePresence } from "motion/react";

export function ResultPanel({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.2, 0.75, 0.25, 1] }}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
```

Do not let Motion and GSAP control the same element's `transform` or `opacity` simultaneously. Assign one engine as the owner of each animated property.

## Three.js scenes

Treat 3D as an optional feature module, not a global page dependency:

1. Load the scene code and assets only when the scene is near the viewport or the user opens it.
2. Provide a meaningful static poster or DOM fallback.
3. Cap pixel ratio (for example, `Math.min(devicePixelRatio, 1.5)`), use responsive sizing and reduce scene complexity on mobile.
4. Pause the render loop when off-screen or `document.hidden`.
5. On teardown, cancel animation frames and dispose geometries, materials, textures, controls and renderer.
6. Under reduced motion, show a stable scene or poster without continuous movement.

## Interactive Motion Lab and acceptance contract

Version 0.2.0 makes selectable preview a mandatory part of the system: **select → preview → understand → tune → export**. The Motion Lab lives in the DAVYLAB website repository at [`motion-lab/index.html`](https://github.com/chenzhe223-tech/chenzhe223-tech.github.io/blob/main/motion-lab/index.html) and the intended public entry is [`https://chenzhe223-tech.github.io/motion-lab/`](https://chenzhe223-tech.github.io/motion-lab/).

The library offers six named motion patterns, a matching 1–5 second preview, concise use-case descriptions, tuning controls, and a JSON configuration export. Playwright smoke coverage checks effect selection, actual Web Animations API activity, selected description, tuned duration, JSON consistency, download naming, and responsive overflow at 1440/1024/390px.

The lab also demonstrates GSAP, Motion's vanilla API and an optional Three.js scene; this does not mean Motion or Three.js have been integrated into every DAVYLAB app. Real-device/browser validation and live deployment verification remain separate acceptance steps and must not be inferred from a merged commit.
