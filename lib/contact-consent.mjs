const VERSION = "1.0.0";
const PRIVACY_ACKNOWLEDGEMENT_ID = "contact-privacy-acknowledgement-v1";
const FOREIGN_TRANSFER_SCOPE = "contact-foreign-transfer-v1";
const DIRECT_EMAIL_SCOPE = "direct-email-inquiry-v1";
const CONTACT_ADDRESS = "contact@kuro-lab.com";
const COVERED_PROCESSING = Object.freeze([
  "cloudflare-contact",
  "resend-contact",
  "google-gmail-contact",
  "google-gmail-followup",
  "cloudflare-email-routing-followup"
]);

export const CONTACT_CONSENT_REGISTRY = Object.freeze({
  ja: Object.freeze({
    privacy: Object.freeze({
      copyId: "contact-privacy-acknowledgement-ja-v1",
      recordId: PRIVACY_ACKNOWLEDGEMENT_ID,
      version: VERSION,
      copy: "プライバシーポリシー（version 1.0.0）を確認しました。",
      sha256: "1aa2b6d9d69d6ef935db30eb410c288cac3460085feb8936d78ca32dd14c3898",
      documentId: "creator-platform-privacy-ja-v1",
      documentVersion: VERSION,
      documentSha256: "ab100451e2eb7d746edba2a784eca94df553d4a69b0695b44fd123669e49f64a"
    }),
    foreign: Object.freeze({
      copyId: "contact-foreign-transfer-ja-v1",
      recordId: FOREIGN_TRANSFER_SCOPE,
      version: VERSION,
      copy: "プライバシーポリシーおよび「国外での個人データの取扱い」（各version 1.0.0）を確認し、本フォーム送信時にCloudflare, Inc.およびPlus Five Five, Inc.が入力情報を処理すること、ならびに問い合わせおよびこれに続く見積り、契約、制作、検収、支払、返金その他の関連業務連絡をGoogle LLCのGmailで受信、保管、送信および返信することに同意します。関連業務連絡を公開メールアドレスで受信する場合、Cloudflare Email Routingを通じて転送されることにも同意します。これらの外国事業者はいずれもアメリカ合衆国に所在します。",
      sha256: "e7f071b7850b82ddaf8d066fabae80649f1209a9577e55fd245b863c8bb0452a",
      documentId: "creator-platform-foreign-processing-ja-v1",
      documentVersion: VERSION,
      documentSha256: "7056b68e78b70139a39486e80d7fc695dc523baed035f100caff744f9f57c193"
    }),
    direct: Object.freeze({
      copyId: "direct-email-inquiry-ja-v1",
      recordId: DIRECT_EMAIL_SCOPE,
      version: VERSION,
      copy: "プライバシーポリシーおよび「国外での個人データの取扱い」を確認し、このメールに含まれる情報がCloudflare, Inc.およびGoogle LLCを通じて、説明に記載された外国で取り扱われることに同意します。Privacy: creator-platform-privacy-ja-v1 / 1.0.0 / 国外取扱い説明: creator-platform-foreign-processing-ja-v1 / 1.0.0 / Locale: ja / Scope: direct-email-inquiry-v1 / 以下に相談内容を記載してください。",
      sha256: "8ae7ab4ab0e3b75c6e26d6d2731fdd752ed4b7e1868cbb66bbd6c939946f6727"
    }),
    errors: Object.freeze({
      privacy: "プライバシーポリシーを確認してください。",
      foreign: "国外での個人データの取扱いを確認し、同意してください。"
    })
  }),
  en: Object.freeze({
    privacy: Object.freeze({
      copyId: "contact-privacy-acknowledgement-en-v1",
      recordId: PRIVACY_ACKNOWLEDGEMENT_ID,
      version: VERSION,
      copy: "I have reviewed the Privacy Policy (version 1.0.0).",
      sha256: "5b1dbf70a3d2738f0eb84092bdb2eb72b9566b6c759af4939ad0975dee8c3375",
      documentId: "creator-platform-privacy-en-v1",
      documentVersion: VERSION,
      documentSha256: "4fef73465af57fab69defb6c680ad6f8f0a0c8594c94c0fced43dab36bd9f140"
    }),
    foreign: Object.freeze({
      copyId: "contact-foreign-transfer-en-v1",
      recordId: FOREIGN_TRANSFER_SCOPE,
      version: VERSION,
      copy: "I have reviewed the Privacy Policy and the Notice Regarding Processing of Personal Data Outside Japan, each version 1.0.0. I consent to the processing of the information entered in this form by Cloudflare, Inc. and Plus Five Five, Inc. when the form is submitted, and to the receipt, retention, sending, and response through Google LLC's Gmail of the inquiry and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters. I also consent to the routing of related communications through Cloudflare Email Routing when they are sent to the public contact address. Each of these foreign providers is located in the United States.",
      sha256: "f23b9e4d8500a44a21791d3c663d6bbbd2fe6be2e2075183d5b45338cb190f09",
      documentId: "creator-platform-foreign-processing-en-v1",
      documentVersion: VERSION,
      documentSha256: "2d67da9979ab69f39b00910d80124d96b68843ae48c4c4361c17dab8469761d2"
    }),
    direct: Object.freeze({
      copyId: "direct-email-inquiry-en-v1",
      recordId: DIRECT_EMAIL_SCOPE,
      version: VERSION,
      copy: "I have reviewed the Privacy Policy and the “Notice Regarding Processing of Personal Data Outside Japan,” and I consent to the information in this email being processed through Cloudflare, Inc. and Google LLC in the countries described in that notice. Privacy: creator-platform-privacy-en-v1 / 1.0.0 / Foreign processing notice: creator-platform-foreign-processing-en-v1 / 1.0.0 / Locale: en / Scope: direct-email-inquiry-v1 / Please enter your inquiry below.",
      sha256: "9361a6e49b788c0cac8a85835de9fda9017da7a5b8a3d8524f72b3202080e1e6"
    }),
    errors: Object.freeze({
      privacy: "Confirm that you reviewed the Privacy Policy.",
      foreign: "Review and consent to the processing of personal data outside Japan."
    })
  })
});

function localeRegistry(locale) {
  return CONTACT_CONSENT_REGISTRY[locale] ?? null;
}

export function contactConsentErrors(input, locale = "ja") {
  const registry = localeRegistry(locale) ?? CONTACT_CONSENT_REGISTRY.ja;
  const errors = {};
  if (input?.privacyAcknowledged !== true) errors.privacyAcknowledged = registry.errors.privacy;
  if (input?.foreignTransferConsent !== true) errors.foreignTransferConsent = registry.errors.foreign;
  return errors;
}

export function currentContactConsentSubmission(locale) {
  const registry = localeRegistry(locale);
  if (!registry) throw new Error("Unsupported Contact consent locale.");
  return {
    locale,
    privacyAcknowledgementId: registry.privacy.recordId,
    privacyAcknowledgementCopyId: registry.privacy.copyId,
    privacyAcknowledgementVersion: registry.privacy.version,
    privacyAcknowledgementCopySha256: registry.privacy.sha256,
    foreignTransferScope: registry.foreign.recordId,
    foreignTransferCopyId: registry.foreign.copyId,
    foreignTransferVersion: registry.foreign.version,
    foreignTransferCopySha256: registry.foreign.sha256,
    privacyDocumentId: registry.privacy.documentId,
    privacyDocumentVersion: registry.privacy.documentVersion,
    privacyDocumentSnapshotSha256: registry.privacy.documentSha256,
    foreignProcessingDocumentId: registry.foreign.documentId,
    foreignProcessingDocumentVersion: registry.foreign.documentVersion,
    foreignProcessingDocumentSnapshotSha256: registry.foreign.documentSha256
  };
}

export function validateContactConsentSubmission(input) {
  const registry = localeRegistry(input?.locale);
  if (!registry || input?.privacyAcknowledged !== true || input?.foreignTransferConsent !== true) return false;
  const expected = currentContactConsentSubmission(input.locale);
  return Object.entries(expected).every(([field, value]) => input?.[field] === value);
}

export function createContactConsentRecord(locale, recordedAt = new Date()) {
  const registry = localeRegistry(locale);
  if (!registry) throw new Error("Unsupported Contact consent locale.");
  return {
    privacyAcknowledgement: "accepted",
    foreignTransferConsent: "accepted",
    recordedAt: recordedAt.toISOString(),
    source: "contact-form",
    locale,
    privacyAcknowledgementId: registry.privacy.recordId,
    scope: registry.foreign.recordId,
    coveredProcessing: [...COVERED_PROCESSING],
    privacy: {
      copyId: registry.privacy.copyId,
      copy: registry.privacy.copy,
      copySha256: registry.privacy.sha256,
      documentId: registry.privacy.documentId,
      documentVersion: registry.privacy.documentVersion,
      snapshotId: `sha256:${registry.privacy.documentSha256}`,
      snapshotSha256: registry.privacy.documentSha256
    },
    foreign: {
      copyId: registry.foreign.copyId,
      copy: registry.foreign.copy,
      copySha256: registry.foreign.sha256,
      documentId: registry.foreign.documentId,
      documentVersion: registry.foreign.documentVersion,
      snapshotId: `sha256:${registry.foreign.documentSha256}`,
      snapshotSha256: registry.foreign.documentSha256
    }
  };
}

export function formatContactConsentRecord(record) {
  return [
    "Consent record",
    `Privacy acknowledgement: ${record.privacyAcknowledgement}`,
    `Foreign-transfer consent: ${record.foreignTransferConsent}`,
    `Recorded at: ${record.recordedAt}`,
    `Source: ${record.source}`,
    `Locale: ${record.locale}`,
    `Privacy acknowledgement ID: ${record.privacyAcknowledgementId}`,
    `Scope: ${record.scope}`,
    `Covered processing: ${record.coveredProcessing.join(",")}`,
    `Privacy policy: ${record.privacy.documentId} / ${record.privacy.documentVersion}`,
    `Privacy acknowledgement copy ID: ${record.privacy.copyId}`,
    `Privacy acknowledgement copy: ${record.privacy.copy}`,
    `Privacy acknowledgement copy SHA-256: ${record.privacy.copySha256}`,
    `Privacy snapshot ID: ${record.privacy.snapshotId}`,
    `Privacy snapshot SHA-256: ${record.privacy.snapshotSha256}`,
    `Foreign processing notice: ${record.foreign.documentId} / ${record.foreign.documentVersion}`,
    `Foreign-transfer consent copy ID: ${record.foreign.copyId}`,
    `Foreign-transfer consent copy: ${record.foreign.copy}`,
    `Foreign-transfer consent copy SHA-256: ${record.foreign.copySha256}`,
    `Foreign processing snapshot ID: ${record.foreign.snapshotId}`,
    `Foreign processing snapshot SHA-256: ${record.foreign.snapshotSha256}`
  ].join("\n");
}

export function buildDirectEmailHref(locale) {
  const registry = localeRegistry(locale);
  if (!registry) throw new Error("Unsupported Contact consent locale.");
  const parameters = new URLSearchParams({
    subject: locale === "ja" ? "制作相談" : "Production inquiry",
    body: registry.direct.copy
  });
  return `mailto:${CONTACT_ADDRESS}?${parameters.toString()}`;
}
