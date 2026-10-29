/* Visual DNA preference controller.
   Add data-vd-set-layout, data-vd-set-nav, data-vd-set-theme to choice buttons.
   Add data-vd-color to <input type="color">; supported values: bg, panel, ink, muted, line, accent, sidebar.
   Add data-vd-font-en-select and data-vd-font-cn-select to font selectors.
   Add data-vd-toggle-collapse to a collapse button and data-vd-open-nav to the persistent nav opener.
   The app must map .vd-sidebar, .vd-main, .vd-main-inner and .vd-workspace-grid to its own DOM. */
(function () {
  "use strict";

  var STORAGE_KEY = "visual-dna:v1";
  var LAYOUTS = ["editorial", "balanced", "vertical", "compact", "bento", "split"];
  var NAVS = ["top", "left", "right", "bottom", "floating", "hidden"];
  var THEMES = ["editorial", "graphite", "coastal", "midnight", "terracotta", "classic"];
  var LAYOUT_BALANCE = { editorial: 50, balanced: 50, vertical: 50, compact: 64, bento: 50, split: 50 };
  var DEFAULTS = {
    layout: "editorial",
    nav: "top",
    collapsed: false,
    theme: "editorial",
    gap: 22,
    balance: 50,
    colors: {},
    fontEn: "inter",
    fontCn: "notoSansSC"
  };
  var COLORS = {
    bg: "--vd-bg",
    panel: "--vd-panel",
    ink: "--vd-ink",
    muted: "--vd-muted",
    line: "--vd-line",
    accent: "--vd-accent",
    sidebar: "--vd-sidebar"
  };
  var THEME_COLORS = {
    editorial: { bg: "#F3EFE6", panel: "#FCFAF5", ink: "#2A2E28", muted: "#70776E", line: "#DCD7CB", accent: "#60764F", sidebar: "#252D27" },
    graphite: { bg: "#161A17", panel: "#202721", ink: "#ECF1E7", muted: "#A2ADA0", line: "#39443A", accent: "#D7FF62", sidebar: "#101411" },
    coastal: { bg: "#EAF2F0", panel: "#FAFCFB", ink: "#1F3837", muted: "#6A8580", line: "#D1E1DC", accent: "#287D73", sidebar: "#183B39" },
    midnight: { bg: "#0F1724", panel: "#172334", ink: "#E9F0FA", muted: "#99ADC4", line: "#2A3C54", accent: "#56D9D0", sidebar: "#09111C" },
    terracotta: { bg: "#F5ECE4", panel: "#FFFAF5", ink: "#382B24", muted: "#8B756A", line: "#E4D2C5", accent: "#B86147", sidebar: "#372A24" },
    classic: { bg: "#F3F6FC", panel: "#FFFFFF", ink: "#132642", muted: "#7D8CA6", line: "#E5EBF5", accent: "#4563F2", sidebar: "#111E36" }
  };
  var EN_FONTS = {
    inter: '"Inter", Arial, sans-serif',
    sourceSans3: '"Source Sans 3", Arial, sans-serif',
    dmSans: '"DM Sans", Arial, sans-serif',
    spaceGrotesk: '"Space Grotesk", Arial, sans-serif',
    playfairDisplay: '"Playfair Display", Georgia, serif',
    manrope: '"Manrope", Arial, sans-serif',
    plusJakartaSans: '"Plus Jakarta Sans", Arial, sans-serif',
    jetBrainsMono: '"JetBrains Mono", ui-monospace, monospace',
    arialCompat: '"Liberation Sans", Arial, sans-serif',
    timesCompat: '"Liberation Serif", "Times New Roman", serif'
  };
  var CN_FONTS = {
    notoSansSC: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
    notoSerifSC: '"Noto Serif SC", "Songti SC", "SimSun", serif',
    lxgwWenKai: '"LXGW WenKai", "Noto Serif SC", "Kaiti SC", "KaiTi", serif',
    smileySans: '"Smiley Sans", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    alibabaPuHuiTi: '"Alibaba PuHuiTi", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    zcoolKuaiLe: '"ZCOOL KuaiLe", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    youSheBiaoTiHei: '"YouShe BiaoTiHei", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    chironGoRound: '"Chiron GoRound TC WS", "Noto Sans SC", "PingFang TC", "Microsoft JhengHei", sans-serif'
  };

  function validHex(value) {
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
  }
  function readSaved() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }
  function writeSaved(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      /* Private browsing or blocked storage: the current page still works. */
    }
  }
  function normalizeState(input) {
    var state = Object.assign({}, DEFAULTS, input || {});
    if (LAYOUTS.indexOf(state.layout) < 0) state.layout = DEFAULTS.layout;
    if (NAVS.indexOf(state.nav) < 0) state.nav = DEFAULTS.nav;
    if (THEMES.indexOf(state.theme) < 0) state.theme = DEFAULTS.theme;
    if (!EN_FONTS[state.fontEn]) state.fontEn = DEFAULTS.fontEn;
    if (!CN_FONTS[state.fontCn]) state.fontCn = DEFAULTS.fontCn;
    state.gap = Math.max(12, Math.min(32, Number(state.gap) || DEFAULTS.gap));
    state.balance = Math.max(35, Math.min(65, Number(state.balance) || DEFAULTS.balance));
    state.collapsed = Boolean(state.collapsed);
    state.colors = state.colors && typeof state.colors === "object" ? state.colors : {};
    return state;
  }
  function markPressed(selector, attribute, active) {
    document.querySelectorAll(selector).forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute(attribute) === active));
    });
  }
  function apply(state, shouldSave) {
    var root = document.documentElement;
    root.setAttribute("data-vd-layout", state.layout);
    root.setAttribute("data-vd-nav", state.nav);
    root.setAttribute("data-vd-nav-collapsed", String(state.collapsed));
    root.setAttribute("data-vd-theme", state.theme);
    root.style.setProperty("--vd-gap", state.gap + "px");
    root.style.setProperty("--vd-layout-left", state.balance + "fr");
    root.style.setProperty("--vd-layout-right", (100 - state.balance) + "fr");
    root.style.setProperty("--vd-font-en", EN_FONTS[state.fontEn]);
    root.style.setProperty("--vd-font-cn", CN_FONTS[state.fontCn]);

    Object.keys(COLORS).forEach(function (key) {
      root.style.removeProperty(COLORS[key]);
    });
    Object.keys(state.colors).forEach(function (key) {
      if (COLORS[key] && validHex(state.colors[key])) root.style.setProperty(COLORS[key], state.colors[key]);
    });

    markPressed("[data-vd-set-layout]", "data-vd-set-layout", state.layout);
    markPressed("[data-vd-set-nav]", "data-vd-set-nav", state.nav);
    markPressed("[data-vd-set-theme]", "data-vd-set-theme", state.theme);

    document.querySelectorAll("[data-vd-color]").forEach(function (input) {
      var key = input.getAttribute("data-vd-color");
      var current = state.colors[key] || (THEME_COLORS[state.theme] && THEME_COLORS[state.theme][key]);
      if (COLORS[key] && validHex(current)) input.value = current;
    });
    document.querySelectorAll("[data-vd-font-en-select]").forEach(function (input) { input.value = state.fontEn; });
    document.querySelectorAll("[data-vd-font-cn-select]").forEach(function (input) { input.value = state.fontCn; });
    document.querySelectorAll("[data-vd-gap]").forEach(function (input) { input.value = String(state.gap); });
    document.querySelectorAll("[data-vd-balance]").forEach(function (input) { input.value = String(state.balance); });

    var collapseButton = document.querySelector("[data-vd-toggle-collapse]");
    if (collapseButton) {
      collapseButton.setAttribute("aria-expanded", String(!state.collapsed));
      collapseButton.setAttribute("aria-label", state.collapsed ? "展开导航" : "收起导航");
    }
    var status = document.querySelector("[data-vd-status]");
    if (status) status.textContent = "布局：" + state.layout + " · 导航：" + state.nav + " · 主题：" + state.theme;

    if (shouldSave) writeSaved(state);
  }

  function init() {
    var state = normalizeState(readSaved());
    var opener = document.querySelector("[data-vd-open-nav]");
    if (opener) {
      opener.addEventListener("click", function () {
        var root = document.documentElement;
        if (state.nav === "hidden") {
          var open = root.getAttribute("data-vd-nav-open") === "true";
          root.setAttribute("data-vd-nav-open", String(!open));
          opener.setAttribute("aria-expanded", String(!open));
        } else {
          state.collapsed = !state.collapsed;
          apply(state, true);
        }
      });
    }
    document.querySelectorAll("[data-vd-set-layout]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = button.getAttribute("data-vd-set-layout");
        if (LAYOUTS.indexOf(next) < 0) return;
        if (state.layout !== next) state.balance = LAYOUT_BALANCE[next] || DEFAULTS.balance;
        state.layout = next;
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-set-nav]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = button.getAttribute("data-vd-set-nav");
        if (NAVS.indexOf(next) < 0) return;
        state.nav = next;
        if (next === "hidden") document.documentElement.setAttribute("data-vd-nav-open", "false");
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-set-theme]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = button.getAttribute("data-vd-set-theme");
        if (THEMES.indexOf(next) < 0) return;
        state.theme = next;
        state.colors = {};
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-color]").forEach(function (input) {
      input.addEventListener("input", function () {
        var key = input.getAttribute("data-vd-color");
        if (!COLORS[key] || !validHex(input.value)) return;
        state.colors[key] = input.value.toUpperCase();
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-font-en-select]").forEach(function (input) {
      input.addEventListener("change", function () {
        if (!EN_FONTS[input.value]) return;
        state.fontEn = input.value;
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-font-cn-select]").forEach(function (input) {
      input.addEventListener("change", function () {
        if (!CN_FONTS[input.value]) return;
        state.fontCn = input.value;
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-gap]").forEach(function (input) {
      input.addEventListener("input", function () {
        state.gap = Math.max(12, Math.min(32, Number(input.value) || DEFAULTS.gap));
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-balance]").forEach(function (input) {
      input.addEventListener("input", function () {
        state.balance = Math.max(35, Math.min(65, Number(input.value) || DEFAULTS.balance));
        apply(state, true);
      });
    });
    document.querySelectorAll("[data-vd-toggle-collapse]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (state.nav === "hidden") {
          var wasOpen = document.documentElement.getAttribute("data-vd-nav-open") === "true";
          document.documentElement.setAttribute("data-vd-nav-open", String(!wasOpen));
          button.setAttribute("aria-expanded", String(!wasOpen));
        } else {
          state.collapsed = !state.collapsed;
          apply(state, true);
        }
      });
    });
    document.querySelectorAll("[data-vd-nav-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (state.nav === "hidden") document.documentElement.setAttribute("data-vd-nav-open", "false");
      });
    });
    document.addEventListener("pointerdown", function (event) {
      if (state.nav !== "hidden" || document.documentElement.getAttribute("data-vd-nav-open") !== "true") return;
      var sidebar = document.querySelector(".vd-sidebar");
      var openerButton = document.querySelector("[data-vd-open-nav]");
      if (sidebar && !sidebar.contains(event.target) && (!openerButton || !openerButton.contains(event.target))) {
        document.documentElement.setAttribute("data-vd-nav-open", "false");
        if (openerButton) openerButton.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.nav === "hidden") document.documentElement.setAttribute("data-vd-nav-open", "false");
    });
    apply(state, false);
    return { getState: function () { return Object.assign({}, state); }, reset: function () { state = normalizeState({}); apply(state, true); } };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();