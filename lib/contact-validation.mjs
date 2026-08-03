export const CONTACT_MIN_MESSAGE_LENGTH = 20;
export const CONTACT_MAX_BODY_BYTES = 16 * 1024;

export const CONTACT_CATEGORIES = [
  { id: "creator-site", label: { ja: "クリエイターサイト制作", en: "Creator website" } },
  { id: "site-improvement", label: { ja: "既存サイトの改善", en: "Existing website improvement" } },
  { id: "tool-service", label: { ja: "ツール・Webサービス制作", en: "Tool or web-service production" } },
  { id: "other", label: { ja: "その他の制作相談", en: "Other production inquiry" } }
];

const CONTACT_FIELD_ORDER = [
  "name",
  "email",
  "category",
  "referenceUrl",
  "message",
  "privacyAcknowledged",
  "foreignTransferConsent"
];
const categoryIds = new Set(CONTACT_CATEGORIES.map(({ id }) => id));

const messages = {
  ja: {
    nameRequired: "お名前または活動名を入力してください。",
    emailRequired: "メールアドレスを入力してください。",
    emailType: "メールアドレスの形式を確認してください。",
    category: "相談カテゴリを選択してください。",
    referenceUrl: "参考URLは http または https で始まる形式で入力してください。",
    messageRequired: "相談内容を入力してください。",
    messageMinimum: `相談内容は${CONTACT_MIN_MESSAGE_LENGTH}文字以上で入力してください。`
  },
  en: {
    nameRequired: "Enter your name or activity name.",
    emailRequired: "Enter your email address.",
    emailType: "Enter a valid email address.",
    category: "Choose an inquiry category.",
    referenceUrl: "Enter a reference URL beginning with http or https.",
    messageRequired: "Enter your inquiry details.",
    messageMinimum: `Enter at least ${CONTACT_MIN_MESSAGE_LENGTH} characters for your inquiry.`
  }
};

function cleanText(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
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

export function normalizeContactPayload(input) {
  return {
    name: cleanText(input?.name, 80),
    email: cleanText(input?.email, 120),
    category: cleanText(input?.category, 40),
    referenceUrl: cleanText(input?.referenceUrl, 300),
    message: cleanText(input?.message, 3000)
  };
}

export function validateContactInput(input, locale = "ja") {
  const copy = messages[locale] ?? messages.ja;
  const values = normalizeContactPayload(input);
  const errors = {};

  if (!values.name) errors.name = copy.nameRequired;
  if (!values.email) errors.email = copy.emailRequired;
  else if (!isEmail(values.email)) errors.email = copy.emailType;
  if (!categoryIds.has(values.category)) errors.category = copy.category;
  if (!isValidUrl(values.referenceUrl)) errors.referenceUrl = copy.referenceUrl;
  if (!values.message) errors.message = copy.messageRequired;
  else if (Array.from(values.message).length < CONTACT_MIN_MESSAGE_LENGTH) errors.message = copy.messageMinimum;

  return errors;
}

export function firstInvalidContactField(errors) {
  return CONTACT_FIELD_ORDER.find((field) => Object.hasOwn(errors, field)) ?? null;
}

export function contactPayloadByteLength(payload) {
  return new TextEncoder().encode(JSON.stringify(payload)).length;
}

export function isContactPayloadTooLarge(payload) {
  return contactPayloadByteLength(payload) > CONTACT_MAX_BODY_BYTES;
}

export function contactCategoryLabel(categoryId, locale = "ja") {
  const category = CONTACT_CATEGORIES.find(({ id }) => id === categoryId);
  return category ? category.label[locale] ?? category.label.ja : categoryId;
}
