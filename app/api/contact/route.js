export const runtime = "edge";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";
const CATEGORY_VALUES = new Set(["新規制作", "既存サイト改善", "業務ツール相談", "運用整理"]);

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
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

function formatContactEmail({ name, email, category, referenceUrl, message }) {
  const rows = [
    ["お名前", name],
    ["メール", email],
    ["相談カテゴリ", category],
    ["参考URL", referenceUrl || "なし"]
  ];

  const text = [
    "kurodev-hp から制作相談が届きました。",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "相談内容:",
    message
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

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: formData
  });

  if (!response.ok) return false;

  const result = await response.json();
  return Boolean(result.success);
}

async function sendContactEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return { ok: false, status: 503 };
  }

  const { text, html } = formatContactEmail(payload);
  const response = await fetch(RESEND_EMAIL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `制作相談: ${payload.category}`,
      reply_to: payload.email,
      text,
      html,
      tags: [{ name: "source", value: "kurodev_hp" }]
    })
  });

  return { ok: response.ok, status: response.status };
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const payload = {
    name: cleanText(body.name, 80),
    email: cleanText(body.email, 120),
    category: cleanText(body.category, 40),
    referenceUrl: cleanText(body.referenceUrl, 300),
    message: cleanText(body.message, 3000)
  };

  if (
    !payload.name ||
    !isEmail(payload.email) ||
    !CATEGORY_VALUES.has(payload.category) ||
    payload.message.length < 20 ||
    !isValidUrl(payload.referenceUrl)
  ) {
    return jsonResponse({ ok: false, error: "INVALID_INPUT" }, 400);
  }

  const turnstileToken = cleanText(body.turnstileToken, 2048);
  const turnstileOk = await verifyTurnstile(turnstileToken, request);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: "TURNSTILE_FAILED" }, 400);
  }

  const sendResult = await sendContactEmail(payload);
  if (!sendResult.ok) {
    return jsonResponse({ ok: false, error: "SEND_FAILED" }, sendResult.status === 503 ? 503 : 502);
  }

  return jsonResponse({ ok: true });
}
