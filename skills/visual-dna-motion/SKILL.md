---
name: visual-dna-motion
version: 0.2.0
description: |
  DAVYLAB Visual DNA Motion System — a reusable, brand-aware motion design and frontend animation system built on GSAP, Motion, and Three.js.
  Use for website/app motion audits, animation architecture, interaction states, scroll storytelling, 3D scenes, accessibility, performance, and reusable motion tokens.
---

# Visual DNA Motion System

## Mission

Create motion that makes a product more understandable, responsive, memorable, and usable. Do not add animation merely to make a page look "AI-like". Motion should express hierarchy, cause and effect, progress, state, or brand character.

Brand anchor: **DAVYLAB — 把想法，做成能用的工具。** The system should feel inventive and energetic without defaulting to constant glow, random particles, excessive gradients, or motion on every element.

## Mandatory workflow

### 1. Audit before editing

Inspect the existing framework, entry points, scripts, package manager, current animation libraries, DOM hooks, routing, reduced-motion handling, loading behavior, and tests. Identify frozen pages, business logic, API contracts, and dynamic DOM regions. Reuse installed dependencies; do not install a second animation system that duplicates an existing one.

For static sites, inspect script order and CDN fallback. For React, inspect component lifecycle and hydration constraints. Never assume the repository is React or add a bundler without evidence.

### 2. Define a motion brief

Record:
- Product role and brand personality.
- Primary user action and what motion should communicate.
- Motion intensity: quiet, balanced, expressive.
- Desktop/tablet/mobile behavior.
- Reduced-motion behavior.
- Performance budget and fallback when an engine fails to load.

Choose only the motion patterns that serve the task.

### 3. Engine responsibilities

**GSAP — choreography and timeline**
- Scroll-triggered reveals, pinned/scrollytelling sections, timeline sequences, SVG drawing, coordinated multi-element motion.
- Use ScrollTrigger only when the effect genuinely benefits from scroll position.
- Keep animations scoped and clean up timelines, triggers, observers, listeners, and inline styles when their owning view is removed.

**Motion (Motion for React; formerly Framer Motion) — component interaction**
- React component enter/exit, layout transitions, drag/gesture interactions, shared UI states and presence.
- Use only in React applications where the dependency is appropriate. Do not add React to a static HTML page just to use Motion.
- Avoid letting GSAP and Motion animate the same DOM property on the same element.

**Three.js — spatial scenes**
- Interactive 3D, WebGL scenes, particles or knowledge-world visualizations when depth is a meaningful product affordance.
- Lazy-load the scene and assets; provide a poster/DOM fallback; cap device pixel ratio; pause rendering when off-screen or the tab is hidden; dispose geometries, materials, textures, and renderer on teardown.
- Never use Three.js for ordinary cards, buttons, or simple decorative shapes that CSS can handle.

**CSS / Web Animations API — lightweight primitives**
- Hover/focus states, simple state changes, reduced-motion fallbacks and low-cost loops.
- Prefer transform and opacity. Avoid animating layout-heavy properties continuously.

### 4. Shared motion tokens

Use the companion `assets/motion-tokens.css` as the starting point, then adapt to the product's visual DNA. Keep duration, easing, distance, stagger, and intensity centralized. Do not bake the same duration into many unrelated components.

Initial intent:
- Micro interaction: 100–180ms.
- Component transition: 180–320ms.
- Section reveal: 400–750ms.
- Brand hero choreography: 600–1100ms, with staggered sequence.
- Continuous ambient movement: rare, slow, pauseable, and never required to understand content.

These are starting ranges, not rigid laws. Respect reduced-motion preferences and avoid delaying critical actions.

### 5. Mandatory selection, preview, and tuning experience

Whenever a UI lets users choose an animation effect, the choice must be demonstrated, not merely named. Treat this as a release-blocking acceptance requirement.

- **Selection starts a matching preview:** clicking/tapping a motion option updates the selected state and plays that exact effect in a dedicated preview area. Do not substitute a static thumbnail, unrelated loop, or text-only state change.
- **Preview duration:** provide a short, controllable preview of approximately 1–5 seconds. Keep looping previews within the chosen total preview window; avoid perpetual loops by default.
- **Professional microcopy:** each effect has a concise, specific description that explains its visual behavior, suitable use cases, and the UX purpose it serves. Avoid vague labels such as “cool”, “smooth”, or “premium”.
- **Real tuning controls:** expose meaningful controls such as duration, intensity/distance, direction, easing, and stagger where relevant. Do not show controls that do not affect the selected effect. Changes must update the preview and configuration.
- **Consistent selection state:** the selected option, preview title, description, control values, and exported configuration must always refer to the same effect. Reset restores documented defaults for the current effect, not unrelated global settings.
- **Portable configuration:** where the product supports handoff, export a readable JSON configuration with a schema/version, effect identifier, description, timing, easing, motion parameters, and reduced-motion behavior. Export only actual selected values; never claim the JSON has been applied to another product automatically.
- **Accessible behavior:** use semantic buttons and visible focus, support keyboard/touch, announce relevant status changes, and honor `prefers-reduced-motion`. When reduced motion is active, preserve the selected effect and its description while keeping the preview stable and clearly explaining why motion is suppressed.
- **Failure resilience:** preview-engine failure must not hide the library, descriptions, controls, or export path. Do not report a preview as running if no animation started.
- **Test the contract:** automate selecting multiple effects, checking preview state and description, tuning values, verifying JSON consistency, testing export, reduced-motion behavior, and responsive overflow at desktop/tablet/mobile widths.

The Motion Lab should be a usable motion decision tool: **select → preview → understand → tune → export**.

### 5. Motion grammar

Use these semantic states consistently:
- `idle`: quiet, stable, no unnecessary movement.
- `hover/focus`: small affordance cue; keyboard focus remains visible.
- `pressed/dragging`: tactile response, not a layout jump.
- `loading/thinking`: honest indication of ongoing work; never imply progress that is not real.
- `success`: concise confirmation linked to a real successful operation.
- `error`: stable, readable error state; no alarming shaking loop.
- `empty`: helpful entry point, not a decorative animation.
- `disabled`: clearly unavailable, no misleading interaction cue.

Motion must never be the only carrier of state. Pair it with text, icons, or accessible status semantics.

### 6. Responsive and accessibility rules

- Respect `prefers-reduced-motion: reduce`. Disable parallax, long scroll scrubbing, ambient loops and nonessential 3D motion; preserve readable content and state feedback.
- Do not hide critical content until JavaScript or a CDN has loaded.
- Avoid hover-only interaction. Support touch and keyboard.
- Keep focus indicators visible and avoid moving focused controls.
- Do not flash, rapidly oscillate, or trigger motion that can cause discomfort.
- On small devices, reduce distance, particle count, pixel ratio, pinned sections and continuous effects.
- Pause ambient timelines and WebGL rendering when the document is hidden; resume safely.
- Prevent horizontal overflow, scroll trapping, modal focus loss and tap-target shrinkage.

### 7. Performance and resilience

- Animate `transform` and `opacity` first.
- Avoid layout thrashing and per-frame React state updates.
- Use IntersectionObserver or ScrollTrigger instead of continuous scroll handlers when suitable.
- Scope GSAP selectors to a component/root and revert on teardown.
- Load Three.js only when the relevant scene is near the viewport or explicitly opened.
- If a CDN/library fails, content remains visible and interactive; log diagnostics without fabricating success.
- Do not add perpetual animation to every card or run a full-screen WebGL scene by default.
- Test mobile Safari and embedded browsers where relevant.

### 8. Verification checklist

Before reporting completion:
- [ ] Existing behavior, content, URLs, forms and data are preserved.
- [ ] No duplicate ownership of the same animated property.
- [ ] Desktop (~1440px), tablet (~1024px), and mobile (~390px) checked.
- [ ] Reduced-motion mode checked.
- [ ] No content flash, invisible content, horizontal overflow or blocked controls.
- [ ] Scroll triggers and observers do not duplicate after rerender/navigation.
- [ ] Hidden tabs pause ambient work; teardown disposes resources.
- [ ] Network/library failure leaves a usable page.
- [ ] Existing tests run; report any tests not run.
- [ ] Deployment is claimed only after the actual deployment is verified.

## Delivery stages

1. **Foundation:** audit, motion brief, tokens, semantic states, reduced-motion baseline.
2. **Core choreography:** page entry, section reveals, meaningful transitions and lifecycle cleanup.
3. **Reactive UI:** interaction states, layout transitions and dynamic content.
4. **Spatial layer:** optional Three.js scene, lazy loading and mobile fallback.
5. **Calibration:** responsive/performance/accessibility tests and visual review.
6. **Distribution:** publish reusable examples, installation notes and per-framework adapters.

Do not skip the audit or jump directly to 3D. The 3D layer is optional; the system is successful when the right motion improves the experience, not when all three libraries are used on every page.
