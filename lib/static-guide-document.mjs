import {
  CONTACT_CONSENT_REGISTRY,
  buildDirectEmailHref,
  currentContactConsentSubmission
} from "./contact-consent.mjs";
import {
  CONTACT_CATEGORIES,
  CONTACT_MIN_MESSAGE_LENGTH
} from "./contact-validation.mjs";
import { siteCopy } from "./content/site-copy.mjs";

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

  function refreshProductMediaLayers(theme) {
    window.requestAnimationFrame(function () {
      var depth = theme === "dark" ? "0.002px" : "0.001px";
      document.querySelectorAll(".product-media img").forEach(function (image) {
        image.style.transform = "translateZ(" + depth + ")";
      });
    });
  }

  function toggleTheme() {
    var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("kurodev-theme", nextTheme);
    } catch (error) {}
    window.dispatchEvent(new Event("kurodev-theme-change"));
    refreshProductMediaLayers(nextTheme);
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

const englishSuggestionIsland = `
<script data-kurodev-english-suggestion-island>
(function () {
  var dismissed = false;
  var storedLocale = null;
  try {
    dismissed = window.sessionStorage.getItem("kurodev-english-suggestion-dismissed") === "1";
    storedLocale = window.localStorage.getItem("kurodev-locale");
  } catch (error) {}
  var browserPrefersEnglish = window.navigator.language.toLowerCase().startsWith("en");
  if (dismissed || (storedLocale !== "en" && (storedLocale || !browserPrefersEnglish))) return;

  var suggestion = document.createElement("aside");
  suggestion.className = "english-suggestion";
  suggestion.setAttribute("aria-label", "English language suggestion");

  var message = document.createElement("p");
  message.textContent = "English version is available.";

  var link = document.createElement("a");
  link.href = "/en";
  link.lang = "en";
  link.textContent = "View in English";
  link.addEventListener("click", function () {
    try {
      window.localStorage.setItem("kurodev-locale", "en");
    } catch (error) {}
  });

  var closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", function () {
    try {
      window.sessionStorage.setItem("kurodev-english-suggestion-dismissed", "1");
    } catch (error) {}
    suggestion.remove();
  });

  suggestion.append(message, link, closeButton);
  document.getElementById("main-content")?.prepend(suggestion);
})();
</script>`;

const contactValidationCopy = Object.freeze({
  ja: Object.freeze({
    nameRequired: "お名前または活動名を入力してください。",
    emailRequired: "メールアドレスを入力してください。",
    emailType: "メールアドレスの形式を確認してください。",
    category: "相談カテゴリを選択してください。",
    referenceUrl: "参考URLは http または https で始まる形式で入力してください。",
    messageRequired: "相談内容を入力してください。",
    messageMinimum: `相談内容は${CONTACT_MIN_MESSAGE_LENGTH}文字以上で入力してください。`
  }),
  en: Object.freeze({
    nameRequired: "Enter your name or activity name.",
    emailRequired: "Enter your email address.",
    emailType: "Enter a valid email address.",
    category: "Choose an inquiry category.",
    referenceUrl: "Enter a reference URL beginning with http or https.",
    messageRequired: "Enter your inquiry details.",
    messageMinimum: `Enter at least ${CONTACT_MIN_MESSAGE_LENGTH} characters for your inquiry.`
  })
});

function inlineJson(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function contactFormIsland(locale) {
  const registry = CONTACT_CONSENT_REGISTRY[locale];
  const copy = siteCopy[locale].contact.form;
  const config = {
    locale,
    categoryIds: CONTACT_CATEGORIES.map(({ id }) => id),
    minimumMessageLength: CONTACT_MIN_MESSAGE_LENGTH,
    validation: contactValidationCopy[locale],
    consentErrors: registry.errors,
    submission: currentContactConsentSubmission(locale),
    directEmailHref: buildDirectEmailHref(locale),
    submit: copy.submit,
    sending: copy.sending,
    turnstileError: copy.turnstile,
    status: copy.status,
    fallback: copy.fallback,
    fallbackAction: copy.fallbackAction,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""
  };

  return `
<script data-kurodev-contact-island>
(function () {
  var config = ${inlineJson(config)};
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var fields = [
    "name",
    "email",
    "category",
    "referenceUrl",
    "message",
    "privacyAcknowledged",
    "foreignTransferConsent"
  ];
  var controls = {};
  fields.forEach(function (field) {
    controls[field] = form.elements.namedItem(field);
  });
  var statusRegion = form.querySelector(".contact-form__status");
  var submitButton = form.querySelector('button[type="submit"]');
  var widgetId = null;
  var tokenResolve = null;
  var tokenReject = null;

  function valuesFromForm() {
    return {
      name: controls.name.value,
      email: controls.email.value,
      category: controls.category.value,
      referenceUrl: controls.referenceUrl.value,
      message: controls.message.value,
      privacyAcknowledged: controls.privacyAcknowledged.checked,
      foreignTransferConsent: controls.foreignTransferConsent.checked
    };
  }

  function validEmail(value) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  }

  function validReferenceUrl(value) {
    if (!value) return true;
    try {
      var url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  function validateValues(values) {
    var errors = {};
    var name = values.name.trim();
    var email = values.email.trim();
    var referenceUrl = values.referenceUrl.trim();
    var message = values.message.trim();
    if (!name) errors.name = config.validation.nameRequired;
    if (!email) errors.email = config.validation.emailRequired;
    else if (!validEmail(email)) errors.email = config.validation.emailType;
    if (!config.categoryIds.includes(values.category)) errors.category = config.validation.category;
    if (!validReferenceUrl(referenceUrl)) errors.referenceUrl = config.validation.referenceUrl;
    if (!message) errors.message = config.validation.messageRequired;
    else if (Array.from(message).length < config.minimumMessageLength) errors.message = config.validation.messageMinimum;
    if (!values.privacyAcknowledged) errors.privacyAcknowledged = config.consentErrors.privacy;
    if (!values.foreignTransferConsent) errors.foreignTransferConsent = config.consentErrors.foreign;
    return errors;
  }

  function clearFieldError(field) {
    var control = controls[field];
    document.getElementById(field + "-error")?.remove();
    control.setAttribute("aria-invalid", "false");
    if (field === "message") control.setAttribute("aria-describedby", "message-guidance");
    else control.removeAttribute("aria-describedby");
  }

  function showFieldError(field, message) {
    var control = controls[field];
    var error = document.createElement("p");
    error.id = field + "-error";
    error.className = "contact-form__error";
    error.textContent = message;
    control.setAttribute("aria-invalid", "true");
    control.setAttribute(
      "aria-describedby",
      field === "message" ? "message-guidance " + error.id : error.id
    );
    var consent = control.closest(".contact-form__consent");
    (consent || control.parentElement).append(error);
  }

  function renderErrors(errors) {
    fields.forEach(clearFieldError);
    Object.entries(errors).forEach(function (entry) {
      showFieldError(entry[0], entry[1]);
    });
  }

  function setStatus(status) {
    var submitting = status === "turnstile" || status === "sending";
    form.setAttribute("aria-busy", submitting ? "true" : "false");
    submitButton.disabled = submitting;
    submitButton.textContent = status === "sending" ? config.sending : config.submit;
    statusRegion.className = "contact-form__status contact-form__status--" + status;
    statusRegion.setAttribute("role", status === "error" ? "alert" : "status");
    statusRegion.setAttribute("aria-live", status === "error" ? "assertive" : "polite");
    statusRegion.textContent = config.status[status] || "";
    if (status === "error") {
      var fallback = document.createElement("p");
      var link = document.createElement("a");
      fallback.className = "contact-form__fallback";
      fallback.append(document.createTextNode(config.fallback + " "));
      link.href = config.directEmailHref;
      link.textContent = config.fallbackAction;
      fallback.append(link);
      statusRegion.append(fallback);
    }
  }

  function clearPendingTurnstile(error) {
    if (error && tokenReject) tokenReject(error);
    tokenResolve = null;
    tokenReject = null;
  }

  function turnstileContainer() {
    return form.querySelector(".contact-form__turnstile");
  }

  function ensureTurnstileContainer() {
    var container = turnstileContainer();
    if (container) return container;
    container = document.createElement("div");
    container.className = "contact-form__turnstile";
    container.tabIndex = -1;
    form.querySelector(".contact-form__actions").before(container);
    return container;
  }

  function renderTurnstile() {
    if (!window.turnstile || widgetId !== null || !controls.foreignTransferConsent.checked) return;
    widgetId = window.turnstile.render(ensureTurnstileContainer(), {
      sitekey: config.turnstileSiteKey,
      execution: "execute",
      appearance: "execute",
      callback: function (token) {
        if (tokenResolve) tokenResolve(token);
        clearPendingTurnstile();
      },
      "error-callback": function () {
        clearPendingTurnstile(new Error("Turnstile verification failed."));
      },
      "expired-callback": function () {
        if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
      }
    });
  }

  function ensureTurnstile() {
    if (!config.turnstileSiteKey || !controls.foreignTransferConsent.checked) return;
    ensureTurnstileContainer();
    if (window.turnstile) {
      renderTurnstile();
      return;
    }
    var existing = document.querySelector('script[data-kurodev-turnstile]');
    if (existing) return;
    var script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.kurodevTurnstile = "";
    script.addEventListener("load", renderTurnstile, { once: true });
    document.head.append(script);
  }

  function removeTurnstile() {
    clearPendingTurnstile(new Error("Turnstile consent was withdrawn."));
    if (window.turnstile && widgetId !== null) window.turnstile.remove(widgetId);
    widgetId = null;
    turnstileContainer()?.remove();
  }

  function resetTurnstile() {
    clearPendingTurnstile();
    if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
  }

  function executeTurnstile() {
    if (!config.turnstileSiteKey) return Promise.resolve("");
    if (!window.turnstile || widgetId === null) {
      return Promise.reject(new Error("Turnstile is not ready."));
    }
    return new Promise(function (resolve, reject) {
      tokenResolve = resolve;
      tokenReject = reject;
      window.turnstile.execute(widgetId);
    });
  }

  function showTurnstileError() {
    var container = ensureTurnstileContainer();
    document.getElementById("turnstile-error")?.remove();
    var error = document.createElement("p");
    error.id = "turnstile-error";
    error.className = "contact-form__error";
    error.textContent = config.turnstileError;
    container.setAttribute("aria-invalid", "true");
    container.setAttribute("aria-describedby", error.id);
    container.append(error);
  }

  form.addEventListener("input", function (event) {
    if (fields.includes(event.target.name)) clearFieldError(event.target.name);
  });
  form.addEventListener("change", function (event) {
    if (event.target.name !== "foreignTransferConsent") return;
    if (event.target.checked) ensureTurnstile();
    else removeTurnstile();
  });
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var values = valuesFromForm();
    var nextErrors = validateValues(values);
    renderErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      var firstField = fields.find(function (field) {
        return Object.hasOwn(nextErrors, field);
      });
      requestAnimationFrame(function () {
        controls[firstField]?.focus();
      });
      return;
    }

    var turnstileToken = "";
    try {
      if (config.turnstileSiteKey) {
        setStatus("turnstile");
        turnstileToken = await executeTurnstile();
      }
      setStatus("sending");
      var response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({}, values, config.submission, { turnstileToken: turnstileToken }))
      });
      if (!response.ok) {
        setStatus("error");
        resetTurnstile();
        return;
      }
      removeTurnstile();
      form.reset();
      renderErrors({});
      setStatus("success");
    } catch (error) {
      showTurnstileError();
      setStatus("error");
      resetTurnstile();
    }
  });
})();
</script>`;
}

export function isStaticGuideRequest(url, method = "GET") {
  return method === "GET"
    && url.pathname === "/guide/getting-started"
    && !url.searchParams.has(SOURCE_QUERY);
}

export function isStaticHomeRequest(url, method = "GET") {
  return method === "GET"
    && url.pathname === "/"
    && !url.searchParams.has(SOURCE_QUERY);
}

export function isStaticToolsRequest(url, method = "GET") {
  return method === "GET"
    && url.pathname === "/tools"
    && !url.searchParams.has(SOURCE_QUERY);
}

export function isStaticCreatorSiteRequest(url, method = "GET") {
  return method === "GET"
    && url.pathname === "/creator-site"
    && !url.searchParams.has(SOURCE_QUERY);
}

export function isStaticContactRequest(url, method = "GET") {
  return method === "GET"
    && url.pathname === "/contact"
    && !url.searchParams.has(SOURCE_QUERY);
}

export function staticGuideSourceUrl(url) {
  const sourceUrl = new URL(url);
  sourceUrl.searchParams.set(SOURCE_QUERY, "1");
  return sourceUrl;
}

export function staticSourceRequestHeaders(locale) {
  return new Headers({
    accept: "text/html",
    "user-agent": "kurodev-static-document/1.0",
    "x-kurodev-locale": locale
  });
}

function buildStaticDocument(source, marker, routeIslands = "") {
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
  const markedDocument = withoutNextScripts.replace(/<html\b/i, `<html ${marker}`);
  return markedDocument.replace(/<\/body>/i, `${interactionIsland}${routeIslands}</body>`);
}

export function buildStaticGuideDocument(source) {
  return buildStaticDocument(source, "data-kurodev-static-guide")
    .replace(/\s+srcset=(["'])[\s\S]*?\1/gi, "");
}

export function buildStaticHomeDocument(source) {
  return buildStaticDocument(source, "data-kurodev-static-home", englishSuggestionIsland);
}

export function buildStaticToolsDocument(source) {
  return buildStaticDocument(source, "data-kurodev-static-tools");
}

export function buildStaticCreatorSiteDocument(source) {
  return buildStaticDocument(source, "data-kurodev-static-creator-site");
}

export function buildStaticContactDocument(source, locale = "ja") {
  return buildStaticDocument(source, "data-kurodev-static-contact", contactFormIsland(locale));
}
