import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const consentUrl = pathToFileURL(`${repositoryRoot}/lib/contact-consent.mjs`).href;
const consentModule = await import(consentUrl).catch(() => ({}));

const expectedCopies = {
  ja: {
    privacy: "プライバシーポリシー（version 1.0.0）を確認しました。",
    foreign: "プライバシーポリシーおよび「国外での個人データの取扱い」（各version 1.0.0）を確認し、本フォーム送信時にCloudflare, Inc.およびPlus Five Five, Inc.が入力情報を処理すること、ならびに問い合わせおよびこれに続く見積り、契約、制作、検収、支払、返金その他の関連業務連絡をGoogle LLCのGmailで受信、保管、送信および返信することに同意します。関連業務連絡を公開メールアドレスで受信する場合、Cloudflare Email Routingを通じて転送されることにも同意します。これらの外国事業者はいずれもアメリカ合衆国に所在します。",
    direct: "プライバシーポリシーおよび「国外での個人データの取扱い」を確認し、このメールに含まれる情報がCloudflare, Inc.およびGoogle LLCを通じて、説明に記載された外国で取り扱われることに同意します。Privacy: creator-platform-privacy-ja-v1 / 1.0.0 / 国外取扱い説明: creator-platform-foreign-processing-ja-v1 / 1.0.0 / Locale: ja / Scope: direct-email-inquiry-v1 / 以下に相談内容を記載してください。"
  },
  en: {
    privacy: "I have reviewed the Privacy Policy (version 1.0.0).",
    foreign: "I have reviewed the Privacy Policy and the Notice Regarding Processing of Personal Data Outside Japan, each version 1.0.0. I consent to the processing of the information entered in this form by Cloudflare, Inc. and Plus Five Five, Inc. when the form is submitted, and to the receipt, retention, sending, and response through Google LLC's Gmail of the inquiry and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters. I also consent to the routing of related communications through Cloudflare Email Routing when they are sent to the public contact address. Each of these foreign providers is located in the United States.",
    direct: "I have reviewed the Privacy Policy and the “Notice Regarding Processing of Personal Data Outside Japan,” and I consent to the information in this email being processed through Cloudflare, Inc. and Google LLC in the countries described in that notice. Privacy: creator-platform-privacy-en-v1 / 1.0.0 / Foreign processing notice: creator-platform-foreign-processing-en-v1 / 1.0.0 / Locale: en / Scope: direct-email-inquiry-v1 / Please enter your inquiry below."
  }
};

const expectedHashes = {
  ja: {
    privacy: "1aa2b6d9d69d6ef935db30eb410c288cac3460085feb8936d78ca32dd14c3898",
    foreign: "e7f071b7850b82ddaf8d066fabae80649f1209a9577e55fd245b863c8bb0452a",
    direct: "8ae7ab4ab0e3b75c6e26d6d2731fdd752ed4b7e1868cbb66bbd6c939946f6727"
  },
  en: {
    privacy: "5b1dbf70a3d2738f0eb84092bdb2eb72b9566b6c759af4939ad0975dee8c3375",
    foreign: "f23b9e4d8500a44a21791d3c663d6bbbd2fe6be2e2075183d5b45338cb190f09",
    direct: "9361a6e49b788c0cac8a85835de9fda9017da7a5b8a3d8524f72b3202080e1e6"
  }
};

const validJapaneseConsent = {
  locale: "ja",
  privacyAcknowledged: true,
  foreignTransferConsent: true,
  privacyAcknowledgementId: "contact-privacy-acknowledgement-v1",
  privacyAcknowledgementCopyId: "contact-privacy-acknowledgement-ja-v1",
  privacyAcknowledgementVersion: "1.0.0",
  privacyAcknowledgementCopySha256: "1aa2b6d9d69d6ef935db30eb410c288cac3460085feb8936d78ca32dd14c3898",
  foreignTransferScope: "contact-foreign-transfer-v1",
  foreignTransferCopyId: "contact-foreign-transfer-ja-v1",
  foreignTransferVersion: "1.0.0",
  foreignTransferCopySha256: "e7f071b7850b82ddaf8d066fabae80649f1209a9577e55fd245b863c8bb0452a",
  privacyDocumentId: "creator-platform-privacy-ja-v1",
  privacyDocumentVersion: "1.0.0",
  privacyDocumentSnapshotSha256: "ab100451e2eb7d746edba2a784eca94df553d4a69b0695b44fd123669e49f64a",
  foreignProcessingDocumentId: "creator-platform-foreign-processing-ja-v1",
  foreignProcessingDocumentVersion: "1.0.0",
  foreignProcessingDocumentSnapshotSha256: "7056b68e78b70139a39486e80d7fc695dc523baed035f100caff744f9f57c193"
};

test("consent registry pins the six exact approved copy bytes and hashes", () => {
  const { CONTACT_CONSENT_REGISTRY } = consentModule;
  assert.equal(typeof CONTACT_CONSENT_REGISTRY, "object");

  for (const locale of ["ja", "en"]) {
    const entry = CONTACT_CONSENT_REGISTRY[locale];
    for (const kind of ["privacy", "foreign", "direct"]) {
      assert.equal(entry[kind].copy, expectedCopies[locale][kind]);
      assert.equal(entry[kind].sha256, expectedHashes[locale][kind]);
      assert.equal(
        createHash("sha256").update(`${entry[kind].copy}\n`, "utf8").digest("hex"),
        entry[kind].sha256
      );
      assert.equal(entry[kind].version, "1.0.0");
    }
  }
});

test("server consent validation accepts only the current exact locale registry", () => {
  const { validateContactConsentSubmission } = consentModule;
  assert.equal(typeof validateContactConsentSubmission, "function");
  assert.equal(validateContactConsentSubmission(validJapaneseConsent), true);

  for (const [field, value] of [
    ["privacyAcknowledged", false],
    ["foreignTransferConsent", false],
    ["locale", "en"],
    ["privacyAcknowledgementId", "unknown"],
    ["privacyAcknowledgementCopyId", "unknown"],
    ["privacyAcknowledgementVersion", "0.9.0"],
    ["privacyAcknowledgementCopySha256", "0".repeat(64)],
    ["foreignTransferScope", "unknown"],
    ["foreignTransferCopyId", "unknown"],
    ["foreignTransferVersion", "0.9.0"],
    ["foreignTransferCopySha256", "0".repeat(64)],
    ["privacyDocumentVersion", "0.9.0"],
    ["privacyDocumentSnapshotSha256", "0".repeat(64)],
    ["foreignProcessingDocumentVersion", "0.9.0"],
    ["foreignProcessingDocumentSnapshotSha256", "0".repeat(64)]
  ]) {
    assert.equal(validateContactConsentSubmission({ ...validJapaneseConsent, [field]: value }), false, field);
  }
});

test("server generates the complete consent evidence without network or client diagnostics", () => {
  const { createContactConsentRecord, formatContactConsentRecord } = consentModule;
  assert.equal(typeof createContactConsentRecord, "function");
  assert.equal(typeof formatContactConsentRecord, "function");

  const record = createContactConsentRecord("ja", new Date("2026-08-04T03:00:00.000Z"));
  const text = formatContactConsentRecord(record);

  assert.equal(record.recordedAt, "2026-08-04T03:00:00.000Z");
  assert.equal(record.source, "contact-form");
  assert.equal(record.scope, "contact-foreign-transfer-v1");
  assert.deepEqual(record.coveredProcessing, [
    "cloudflare-contact",
    "resend-contact",
    "google-gmail-contact",
    "google-gmail-followup",
    "cloudflare-email-routing-followup"
  ]);
  for (const value of [
    expectedCopies.ja.privacy,
    expectedCopies.ja.foreign,
    expectedHashes.ja.privacy,
    expectedHashes.ja.foreign,
    "ab100451e2eb7d746edba2a784eca94df553d4a69b0695b44fd123669e49f64a",
    "7056b68e78b70139a39486e80d7fc695dc523baed035f100caff744f9f57c193"
  ]) {
    assert.match(text, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(text, /IP address|User-Agent|Turnstile token|raw provider response/i);
});

test("direct-email fallback contains only the approved locale body and fixed identifiers", () => {
  const { buildDirectEmailHref } = consentModule;
  assert.equal(typeof buildDirectEmailHref, "function");

  for (const locale of ["ja", "en"]) {
    const href = new URL(buildDirectEmailHref(locale));
    assert.equal(href.protocol, "mailto:");
    assert.equal(href.pathname, "contact@kuro-lab.com");
    assert.equal(href.searchParams.get("body"), expectedCopies[locale].direct);
    assert.equal(href.searchParams.get("body").includes("hello@example.com"), false);
  }
});

test("Contact and API preserve consent-before-provider sequencing", async () => {
  const [formSource, routeSource] = await Promise.all([
    readFile(`${repositoryRoot}/components/contact-form.js`, "utf8"),
    readFile(`${repositoryRoot}/app/api/contact/route.js`, "utf8")
  ]);

  for (const token of [
    "privacyAcknowledged",
    "foreignTransferConsent",
    "currentContactConsentSubmission",
    "?render=explicit",
    "turnstile.execute",
    "buildDirectEmailHref"
  ]) {
    assert.match(formSource, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.ok(
    routeSource.indexOf("if (!validateContactConsentSubmission(body))") <
      routeSource.indexOf("const turnstileOk = await verifyTurnstile"),
    "server consent validation must occur before Turnstile verification"
  );
  assert.ok(
    routeSource.indexOf("const consentRecord = createContactConsentRecord") <
      routeSource.indexOf("const sendResult = await sendContactEmail"),
    "server evidence generation must occur before provider delivery"
  );
});
