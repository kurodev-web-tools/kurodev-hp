---
documentId: creator-platform-foreign-processing-en-ai-draft-v1
locale: en
documentType: foreign-processing
status: blocked
approvalState: unapproved
reviewRequirement: legal-review-required
draftDate: 2026-07-17
effectiveDate: null
updateDate: null
providerReviewDate: 2026-07-17
equivalentDraft: content/legal/ja/foreign-processing.md
reviewEvidence: docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md
---

# Notice Regarding Processing of Personal Data Outside Japan

## 1. About this notice

Creator Platform may use providers located outside Japan, or providers that process information outside Japan, to deliver and protect the site, send and receive inquiries, perform production work, and process payments.

In this notice, the “recipient country” is, in principle, the country in which the entity receiving personal data is located. Countries in which that entity's data centers, affiliates, or subprocessors are located are identified separately as “storage and processing locations.”

For each processing stage, this notice identifies the recipient entity and country, information processed, purpose, storage and processing locations, safeguards published by the provider, how to check subprocessors, and review date. We do not request advance blanket consent for a service whose use has not yet been determined.

Provider information last reviewed: July 17, 2026.

## 2. Information about recipient countries

### United States

According to information published by Japan's Personal Information Protection Commission based on its review as of October 2021, the United States has no comprehensive federal privacy law that applies uniformly across the private sector. Sector-specific federal laws and state laws exist. The United States participates in an international cross-border privacy rules framework, but this does not mean that every provider located there holds certification under that framework or implements the same safeguards. Rights and obligations may vary with the provider, state, type of information, and purpose of use.

The Commission cautions that its published information is not exhaustive and that legal systems may have changed since its review. KuroDev checks current contracts and safeguards published by each provider in addition to the Commission's information.

- Personal Information Protection Commission, Japan, “Foreign system: United States”: <https://www.ppc.go.jp/enforcement/infoprovision/laws/offshore_report_america/>

### Ireland and the European Union

Ireland is an EU Member State, and the GDPR applies in the European Union. Japan's Personal Information Protection Commission has designated EU Member States as having personal information protection systems at a level equivalent to Japan for purposes of Article 28 of Japan's Act on the Protection of Personal Information. A transfer to a third party in Ireland therefore does not require foreign-transfer consent solely because that party is located in Ireland. Any onward transfer outside the EU, or receipt by another foreign entity, is assessed separately.

- Personal Information Protection Commission, Japan, “EU”: <https://www.ppc.go.jp/enforcement/infoprovision/EU/>
- Personal Information Protection Commission, Japan, cross-border data transfers between Japan and the EU or UK: <https://www.ppc.go.jp/enforcement/cooperation/cooperation/sougoninshou/>

## 3. Ordinary page views

Cloudflare delivery and essential security processing for an ordinary page view occur separately from Contact-form consent. Contact-form consent covers processing of information entered in the form through KuroDev's Contact API running on Cloudflare and the other transmission providers used when the form is submitted.

### Cloudflare, Inc.

- Recipient entity and country: Cloudflare, Inc., United States
- Stage: site delivery and security protection
- Information: IP address, request time, browser, device, connection and security information
- Purpose: deliver the site, distinguish bots and spam, prevent abuse, investigate failures, and maintain security
- Storage and processing locations: principally the United States and the European Economic Area, with processing through Cloudflare's global network
- Safeguards: Cloudflare publishes administrative, technical, and physical safeguards and international-transfer measures.
- Official information: <https://www.cloudflare.com/policies/privacy/>, <https://www.cloudflare.com/turnstile-privacy-policy/>, <https://www.cloudflare.com/cloudflare-customer-dpa/>

Cloudflare processes information as KuroDev's processor for ordinary page delivery and essential security protection. Cloudflare's Data Processing Addendum applies to this processor-side handling.

## 4. Contact-form submission

Contact-form consent covers submission-stage processing by Cloudflare and Resend, and the receipt, retention, sending, and response through Google Gmail of the inquiry and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters. Where related communications are sent to the public contact address, the scope also covers routing through Cloudflare Email Routing. It does not cover Google Drive or Stripe. GitHub is not used as a recipient that stores or processes a User's personal data.

Turnstile is initialized only after the foreign-transfer consent checkbox has been selected. Before consent, no Turnstile token is obtained or verified, and the inquiry content is not transmitted to KuroDev's Contact API running on Cloudflare or to Resend.

### Cloudflare, Inc.

- Recipient entity and country: Cloudflare, Inc., United States
- Stage: transit through KuroDev's Contact API running on Cloudflare and Turnstile abuse prevention
- Information: the technical information described in Section 3, Turnstile Signals, Sitekey, related origin, token and verification result, and inquiry information passing through KuroDev's Contact API
- Purpose: provide the form, prevent abusive submissions, investigate failures, and maintain security
- Storage and processing locations and safeguards: as described in Section 3

For Turnstile, Cloudflare processes Signals as KuroDev's processor to protect the site and may also process certain Signals as a controller under its own responsibility for improving Turnstile's security and performance and for other published purposes.

### Plus Five Five, Inc. (Resend)

- Recipient entity and country: Plus Five Five, Inc., United States
- Stage: delivery of a Contact inquiry email to KuroDev
- Information: name or activity name, email address, inquiry category, optional reference URL, inquiry details, recipient and reply-to metadata, a source tag, and the consent record
- Purpose: create, send, and manage delivery of the inquiry email, prevent abuse, and investigate failures
- Role: Resend processes the inquiry content, email address, and other customer data sent to the service as KuroDev's processor.
- Storage and processing locations: account data, email metadata, logs, and API records are stored in the United States regardless of the selected sending region. Email routing and sending take place from the sending region configured by KuroDev.
- Sending region used by KuroDev: Tokyo (ap-northeast-1)
- Safeguards: Resend publishes DPA commitments covering confidentiality, access control, encryption, security monitoring, incident response, comparable duties for subprocessors, and international transfers.
- Subprocessors: <https://resend.com/legal/subprocessors>
- Official information: <https://resend.com/legal/dpa>, <https://resend.com/legal/privacy-policy>, <https://resend.com/docs/dashboard/domains/regions>

### Google LLC (Gmail)

- Recipient entity and country: Google LLC, United States
- Stage: receipt, retention, sending, and response through Gmail of Contact-form inquiries and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters
- Information: inquiry content, name or activity name, email address, send and receipt times, sender, recipient, subject, other email metadata, and the consent record
- Purpose: receive, review, respond to, and retain inquiry communications and prevent abuse
- Storage and processing locations: Google data centers located around the world
- Safeguards: Google describes protections in transit and at rest, access control, security monitoring, international-transfer frameworks, and its response to legal requirements. KuroDev uses a Google Account managed exclusively for business under the general Google Terms and Privacy Policy and does not assume that a Google Workspace DPA applies.
- Official information: <https://policies.google.com/terms?gl=jp&hl=en>, <https://policies.google.com/privacy>, <https://policies.google.com/faq>, <https://policies.google.com/privacy/additional?gl=jp>

## 5. Direct email

Initial ordinary inquiries are accepted through the Contact form as a general rule. Direct email is also used when the Contact form is unavailable, for requests concerning retained personal data, requests for operator information, security communications, and communications relating to an existing inquiry or contract. The place where the email address is displayed will also display the Privacy Policy, this notice, and the consent wording to be used before sending an ordinary inquiry.

Direct email is forwarded through Cloudflare Email Routing to Gmail in the Google Account managed exclusively for business. Cloudflare, Inc. and Google LLC process the email body, sender, recipient, subject, timestamps, routing information, and attachments.

If an initial ordinary-inquiry email does not contain the required consent wording, KuroDev will perform only the minimum processing needed to direct the sender to resubmit through the current Contact form. Consent obtained after receipt will not be applied retroactively to processing that occurred when the email was received, and the email will be deleted to the extent legally and technically possible. A request concerning retained personal data, a request for operator information, a security communication, or another communication that must be accepted by law will not be rejected solely because the consent wording is absent and will be processed to the extent legally required.

## 6. Production and payment stages

For Google Drive, Stripe, and any other service used during production or payment, KuroDev provides, before the service is used for the engagement, an engagement-specific explanation identifying the recipient entity and country, information involved, purpose, storage and processing locations, safeguards, document version, and consent scope, and obtains any required consent. Silence is not treated as consent, and multiple undetermined services are not combined into blanket consent.

This section is a general description of services that may be used during production or payment. It is not, by itself, used to obtain consent for a foreign transfer in a particular engagement. Before actual use, KuroDev provides an engagement-specific explanation identifying the product used, information involved, purpose, recipient entity, country, storage and processing locations, and safeguards.

KuroDev does not use GitHub to store or process a User's personal data. If a private repository is used, it is limited to source-code management under a non-identifying project code and dummy data. A User's name, email address, activity name, handle, profile, biography, facial photograph or other identifying image, social-media URL, identifying domain, image or file metadata, contract or production communications, User-supplied Git author information, commit messages, branch names, Issue or Pull Request author information, CI or build logs, artifacts, and other personal data are not stored in GitHub. Before changing this boundary, KuroDev will revise this notice and provide any information or obtain any consent required by law.

### Google LLC (Google Drive)

- Recipient entity and country: Google LLC, United States
- Storage and processing locations: Google data centers located around the world
- Information and purpose: the pre-use explanation identifies the information actually uploaded for that engagement, such as a contract or production material, and the applicable storage and sharing purpose.
- Information not stored: credentials, full payment details, identity-verification documents, and production-environment secrets
- Safeguards: In addition to Google's published protections in transit and at rest, access controls, security monitoring, and international-transfer frameworks, KuroDev limits sharing to necessary recipients and encrypts files before upload where appropriate to the risk. KuroDev uses a general Google Account and does not assume that the Google Workspace Data Processing Addendum applies.

### Stripe Japan, Inc., Stripe Payments Europe, Limited, and Stripe, LLC

- Stripe Japan, Inc. (Japan): contracting entity for an account registered in Japan
- Stripe Payments Europe, Limited (Ireland): additional party for personal data processing
- Stripe, LLC (United States): entity to which personal data is transferred to provide the services
- Storage and processing locations: the United States and other locations in which Stripe, its affiliates, or subprocessors operate
- Information: before payment, the explanation identifies the information processed by the Stripe product actually used, which may include name, email address, order details, payment information, IP address, and other information required for payment, fraud prevention, identity verification, and legal compliance. Stripe directly handles full card details.
- Purpose: payment processing, fraud prevention, identity verification, legal compliance, refunds, and transaction administration
- Safeguards: KuroDev reviews Stripe's published data-processing terms, access controls, encryption, fraud-prevention measures, international-transfer measures, and subprocessor management. The Stripe product and settings actually used are confirmed before the engagement-specific explanation and consent.
- Official information: <https://stripe.com/legal/ssa>, <https://stripe.com/legal/dpa>, <https://stripe.com/en-jp/legal/privacy-center>, <https://stripe.com/legal/service-providers>

Stripe may act as a processor on KuroDev's instructions and may also act as a controller under its own responsibility for fraud prevention, legal compliance, identity verification, service improvement, and other purposes identified by Stripe.

## 7. Consent records

The inquiry email received by KuroDev will include and record the following Contact-form consent information:

- consent timestamp;
- display language;
- fixed consent-scope ID;
- covered providers and purposes;
- Privacy Policy title, document ID, and version;
- this notice's title, document ID, and version;
- the full consent wording displayed to the User;
- the identifier of the immutable snapshot of each covered document; and
- the hash of the consent wording and each snapshot.

The full consent wording and immutable snapshots of the covered documents are stored in encrypted local storage outside Git. The inquiry email includes the fixed identifiers and hashes that identify those records.

Before a production or payment service is used, KuroDev sends the service-specific explanation from the business-dedicated Gmail account and obtains a reply that identifies the service, document version, and consent scope and expressly states that the User consents to the identified foreign transfer. The related email thread is retained for the same period as the related record, and important communications are exported to encrypted local storage.

KuroDev does not retain an IP address, User-Agent, Turnstile token, or raw provider response solely to create consent evidence.

## 8. Review

KuroDev reviews this notice when there is a material change to a provider, contracting entity, country, legal system, safeguard, subprocessor, purpose, or processed information, and at least annually. Whether renewed consent is required after a change is determined based on applicable law and, where appropriate, legal review.

## 9. Governing version

The Japanese version of this notice is the governing version. This English version is provided for convenience. If there is any inconsistency between the Japanese and English versions, the Japanese version prevails.
