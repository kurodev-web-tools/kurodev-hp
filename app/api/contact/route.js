export const runtime = "edge";

import {
  contactCategoryLabel,
  isContactPayloadTooLarge,
  normalizeContactPayload,
  validateContactInput
} from "@/lib/contact-validation.mjs";
import {
  createContactConsentRecord,
  formatContactConsentRecord,
  validateContactConsentSubmission
} from "@/lib/contact-consent.mjs";
import { readBoundedContactJson } from "@/lib/contact-request.mjs";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";
const TURNSTILE_TIMEOUT_MS = 5000;
const RESEND_TIMEOUT_MS = 10000;

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function logContactError(code, details = {}) {
  console.error("[contact-api]", code, details);
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatContactEmail({ name, email, category, referenceUrl, message, locale }, consentRecord) {
  const categoryLabel = contactCategoryLabel(category, locale);
  const consentText = formatContactConsentRecord(consentRecord);
  const rows = [
    ["お名前", name],
    ["メール", email],
    ["相談カテゴリ", categoryLabel],
    ["参考URL", referenceUrl || "なし"]
  ];

  const text = [
    "kurodev-hp から制作相談が届きました。",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "相談内容:",
    message,
    "",
    consentText
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827;">
      <p>kurodev-hp から制作相談が届きました。</p>
      <table style="border-collapse:collapse;margin:16px 0;">${htmlRows}</table>
      <p style="margin:16px 0 8px;font-weight:700;">相談内容</p>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">${escapeHtml(message)}</div>
      <p style="margin:16px 0 8px;font-weight:700;">Consent record</p>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">${escapeHtml(consentText)}</div>
    </div>
  `;

  return { text, html };
}

async function verifyTurnstile(token, request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  const remoteIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for");
  if (remoteIp) formData.append("remoteip", remoteIp.split(",")[0].trim());

  let response;

  try {
    response = await fetchWithTimeout(
      TURNSTILE_VERIFY_URL,
      {
        method: "POST",
        body: formData
      },
      TURNSTILE_TIMEOUT_MS
    );
  } catch (error) {
    logContactError("TURNSTILE_VERIFY_ERROR", { reason: error.name || "FETCH_ERROR" });
    return false;
  }

  if (!response.ok) {
    logContactError("TURNSTILE_VERIFY_ERROR", { status: response.status });
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
}

async function sendContactEmail(payload, consentRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return { ok: false, status: 503 };
  }

  const { text, html } = formatContactEmail(payload, consentRecord);
  let response;

  try {
    response = await fetchWithTimeout(
      RESEND_EMAIL_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `制作相談: ${contactCategoryLabel(payload.category, "ja")}`,
          reply_to: payload.email,
          text,
          html,
          tags: [{ name: "source", value: "kurodev_hp" }]
        })
      },
      RESEND_TIMEOUT_MS
    );
  } catch (error) {
    logContactError("RESEND_SEND_ERROR", { reason: error.name || "FETCH_ERROR" });
    return { ok: false, status: 502 };
  }

  if (!response.ok) {
    logContactError("RESEND_SEND_ERROR", { status: response.status });
  }

  return { ok: response.ok, status: response.status };
}

export async function POST(request) {
  let body;

  try {
    body = await readBoundedContactJson(request);
  } catch (error) {
    const code = error?.code === "PAYLOAD_TOO_LARGE" ? "PAYLOAD_TOO_LARGE" : "INVALID_JSON";
    logContactError(code, error?.phase ? { phase: error.phase } : {});
    return jsonResponse({ ok: false, error: code }, code === "PAYLOAD_TOO_LARGE" ? 413 : 400);
  }

  if (isContactPayloadTooLarge(body)) {
    logContactError("PAYLOAD_TOO_LARGE", { phase: "parsed-body" });
    return jsonResponse({ ok: false, error: "PAYLOAD_TOO_LARGE" }, 413);
  }

  const payload = normalizeContactPayload(body);
  if (Object.keys(validateContactInput(payload)).length > 0) {
    return jsonResponse({ ok: false, error: "INVALID_INPUT" }, 400);
  }

  if (!validateContactConsentSubmission(body)) {
    return jsonResponse({ ok: false, error: "CONSENT_REQUIRED" }, 400);
  }

  const turnstileToken = String(body?.turnstileToken ?? "").trim().slice(0, 2048);
  const turnstileOk = await verifyTurnstile(turnstileToken, request);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: "TURNSTILE_FAILED" }, 400);
  }

  const consentRecord = createContactConsentRecord(body.locale);
  const sendResult = await sendContactEmail({ ...payload, locale: body.locale }, consentRecord);
  if (!sendResult.ok) {
    return jsonResponse({ ok: false, error: "SEND_FAILED" }, sendResult.status === 503 ? 503 : 502);
  }

  return jsonResponse({ ok: true });
}
