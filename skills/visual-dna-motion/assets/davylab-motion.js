/* DAVYLAB Visual DNA Motion System — framework-neutral GSAP adapter.
   Load GSAP + (optionally) ScrollTrigger before this file.
   Motion for React and Three.js are documented as separate, opt-in adapters. */
(function (global) {
  "use strict";

  function prefersReducedMotion() {
    return !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function canAnimate() {
    return !prefersReducedMotion() && !!global.gsap;
  }

  function noop() {
    return function () {};
  }

  function scope(root, build) {
    var gsap = global.gsap;
    if (!gsap || typeof build !== "function" || prefersReducedMotion()) return noop();

    if (typeof gsap.context === "function") {
      var context = gsap.context(function () {
        build(gsap);
      }, root || document);
      return function cleanupScope() {
        context.revert();
      };
    }

    // Older GSAP fallback: caller should return/kill its own timelines.
    var cleanup = build(gsap);
    return typeof cleanup === "function" ? cleanup : noop();
  }

  function reveal(target, options) {
    var gsap = global.gsap;
    if (!gsap || prefersReducedMotion() || !target) return null;
    var opts = Object.assign({
      y: 18,
      duration: 0.56,
      delay: 0,
      ease: "power3.out",
      stagger: 0,
      clearProps: "opacity,visibility,transform"
    }, options || {});

    return gsap.fromTo(target,
      { autoAlpha: 0, y: opts.y },
      {
        autoAlpha: 1,
        y: 0,
        duration: opts.duration,
        delay: opts.delay,
        ease: opts.ease,
        stagger: opts.stagger,
        clearProps: opts.clearProps,
        overwrite: "auto"
      }
    );
  }

  function scrollReveal(target, options) {
    var gsap = global.gsap;
    if (!gsap || !global.ScrollTrigger || prefersReducedMotion() || !target) return null;
    gsap.registerPlugin(global.ScrollTrigger);
    var opts = Object.assign({
      start: "top 88%",
      y: 18,
      duration: 0.56,
      ease: "power2.out",
      once: true
    }, options || {});

    return gsap.fromTo(target,
      { autoAlpha: 0, y: opts.y },
      {
        autoAlpha: 1,
        y: 0,
        duration: opts.duration,
        ease: opts.ease,
        clearProps: "opacity,visibility,transform",
        scrollTrigger: {
          trigger: opts.trigger || target,
          start: opts.start,
          once: opts.once
        }
      }
    );
  }

  function stopAmbientOnHidden(timeline) {
    if (!timeline || !document || !document.addEventListener) return noop();
    var onVisibilityChange = function () {
      if (document.hidden) timeline.pause();
      else timeline.resume();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return function cleanupVisibilityListener() {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }

  global.DAVYLABMotion = Object.freeze({
    version: "0.1.0",
    prefersReducedMotion: prefersReducedMotion,
    canAnimate: canAnimate,
    scope: scope,
    reveal: reveal,
    scrollReveal: scrollReveal,
    stopAmbientOnHidden: stopAmbientOnHidden
  });
})(window);
