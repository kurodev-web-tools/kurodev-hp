const SOURCE_QUERY = "__kurodev_app_source";

const menuPath = "M4 7h16M4 12h16M4 17h16";
const closePath = "M6 6l12 12M18 6 6 18";

const interactionIsland = `
<script data-kurodev-island>
(function () {
  var root = document.documentElement;
  var menuButton = document.querySelector(".menu-toggle");
  var dialog = document.getElementById("mobile-site-menu");
  var previousOverflow = "";

  function syncThemeControls() {
    var dark = root.dataset.theme === "dark";
    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.setAttribute("aria-label", dark ? "ライトテーマに切り替え" : "ダークテーマに切り替え");
      button.querySelector('[data-icon="moon"]')?.setAttribute("data-active", dark ? "false" : "true");
      button.querySelector('[data-icon="sun"]')?.setAttribute("data-active", dark ? "true" : "false");
    });
  }

  function toggleTheme() {
    var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("kurodev-theme", nextTheme);
    } catch (error) {}
    syncThemeControls();
  }

  function syncMenuButton(open) {
    if (!menuButton) return;
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    var path = menuButton.querySelector("path");
    if (path) path.setAttribute("d", open ? "${closePath}" : "${menuPath}");
  }

  function closeMenu(restoreFocus) {
    if (!dialog?.open) return;
    dialog.close();
    document.body.style.overflow = previousOverflow;
    syncMenuButton(false);
    if (restoreFocus) menuButton?.focus();
  }

  function openMenu() {
    if (!dialog || dialog.open) return;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    syncMenuButton(true);
    dialog.querySelector("a")?.focus();
  }

  syncThemeControls();
  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    button.addEventListener("click", toggleTheme);
  });
  document.querySelectorAll(".language-switch").forEach(function (link) {
    link.addEventListener("click", function () {
      try {
        window.localStorage.setItem("kurodev-locale", link.getAttribute("lang") || "en");
      } catch (error) {}
    });
  });
  menuButton?.addEventListener("click", function () {
    if (dialog?.open) closeMenu(false);
    else openMenu();
  });
  dialog?.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeMenu(true);
  });
  dialog?.addEventListener("click", function (event) {
    if (event.target === dialog) closeMenu(false);
  });
  dialog?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (!dialog?.open || event.key !== "Tab") return;
    var focusable = Array.from(dialog.querySelectorAll("a, button"));
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
})();
</script>`;

export function isStaticGuideRequest(url) {
  return url.pathname === "/guide/getting-started" && !url.searchParams.has(SOURCE_QUERY);
}

export function staticGuideSourceUrl(url) {
  const sourceUrl = new URL(url);
  sourceUrl.searchParams.set(SOURCE_QUERY, "1");
  return sourceUrl;
}

export function buildStaticGuideDocument(source) {
  const withoutScriptPreloads = source.replace(/<link\b[^>]*>/gi, (tag) => {
    const isNextAsset = /href=["'][^"']*\/_next\/static\/chunks\//i.test(tag);
    const isScriptPreload = /rel=["'](?:modulepreload|preload)["']/i.test(tag) && /as=["']script["']/i.test(tag);
    return isNextAsset && isScriptPreload ? "" : tag;
  });
  const withoutNextScripts = withoutScriptPreloads.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (tag) => {
    const isNextChunk = /src=["'][^"']*\/_next\/static\/chunks\//i.test(tag);
    const isFlightPayload = /self\.__next_f(?:\.push)?/i.test(tag);
    return isNextChunk || isFlightPayload ? "" : tag;
  });
  const markedDocument = withoutNextScripts.replace(/<html\b/i, "<html data-kurodev-static-guide");
  return markedDocument.replace(/<\/body>/i, `${interactionIsland}</body>`);
}
