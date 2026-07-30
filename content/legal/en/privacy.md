---
documentId: creator-platform-privacy-en-v1
version: 1.0.0
locale: en
documentType: privacy
status: ready
approvalState: approved
reviewRequirement: satisfied
draftDate: 2026-07-15
effectiveDate: 2026-08-04
updateDate: 2026-08-04
serviceScope: creator-platform
canonicalRoute: /en/privacy
equivalentDocumentId: creator-platform-privacy-ja-v1
equivalentRoute: /privacy
equivalentDraft: content/legal/ja/privacy.md
reviewEvidence: docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md
---

# Privacy Policy

## 1. Scope

This Policy explains how information is handled through the Creator Platform website operated by KuroDev, a sole proprietor (“KuroDev,” “we,” “us,” or “our”), its inquiry form, and related services for creators.

In this Policy, “Business Day” means a day other than Saturday, Sunday, or a national holiday in Japan.

HP-portal is a separate service operated by us. Information handled through HP-portal is governed by the privacy policy and transaction terms displayed by that service. Other linked services provided by third parties are governed by the privacy policies of those third parties.

## 2. Information We Collect

The Service collects the following information through the inquiry form:

- creator name, stage name, online handle, or legal name;
- email address;
- inquiry category;
- optional reference URL; and
- inquiry details.

After an inquiry, we may also collect the following information in connection with quotations, contracts, production, acceptance review, payment, refunds, and dispute handling:

- legal name, creator name, stage name, online handle, contact details, address, affiliation, or business name;
- quotations, contracts, specifications, invoices, and other contract or transaction information;
- payment status, transaction identifier, amount, date and time, refund status, remitter name, confirmed refund account, and other information needed to administer payment or settlement;
- production materials, images, text, logos, references, attachments, communications, previews, revisions, and acceptance-review records;
- repository, hosting, domain, administrator access, and other external-service information supplied for production, delivery, or operation;
- information needed to verify an individual, legal representative, or other authorized representative;
- for consent concerning handling outside Japan or other consent required by law, the consent timestamp, display language, fixed consent-scope ID, scope, covered providers and purposes, each document's title, document ID and version, the full consent wording displayed to the User, the identifier of the immutable snapshot of each covered document, and the hash of the consent wording and each snapshot; and
- records relating to nonconformity, infringement, disputes, or security incidents.

Stripe directly handles full card details, including card numbers and security codes. We receive payment status, transaction identifiers, amounts, dates and times, refund status, and other information needed to administer the transaction. Where a bank-transfer refund is required, we collect confirmed refund-account information.

Cloudflare delivery and protection, Turnstile abuse prevention, server processing, and incident investigation may also involve an IP address, request time, user agent, TLS fingerprint, Turnstile Sitekey and associated origin, Turnstile token, verification result, and other technical information. Turnstile is initialized only after the foreign-transfer consent checkbox has been selected. Before consent, no Turnstile token is obtained or verified, and the inquiry content is not transmitted to KuroDev's Contact API running on Cloudflare or to Resend. Turnstile verification sends the token and source IP address to Cloudflare. The server records a normalized reason when a communications exception occurs and the HTTP status when Cloudflare returns a non-2xx response. It does not log the raw Turnstile token, inquiry body, raw Cloudflare response, or provider error codes.

## 3. Purposes of Use

We use collected information to:

- review and respond to inquiries;
- communicate before a production engagement; prepare and administer quotations and contracts; perform, review, and deliver agreed work; administer payment, refunds, and maintenance; and retain the related records;
- prevent spam, fraudulent submissions, and other misuse;
- secure, troubleshoot, and improve the Service; and
- comply with law, protect rights, and address disputes.

If personal information is used for a new purpose, this Policy will be updated and notice or publication will be provided when required.

## 4. Browser Storage and Similar Technologies

This website stores the theme and display language selected by the user in browser localStorage so that those choices can be restored. It also stores dismissal of the English-language suggestion in sessionStorage only for the current tab or window session.

At publication, Turnstile on the Contact form will use a configuration with pre-clearance disabled and without issuing a `cf_clearance` cookie for this purpose. Cloudflare Turnstile and other external services may use cookies, local storage, or equivalent technologies required for abuse prevention or service delivery.

This website does not use analytics, advertising cookies, or behavioral tracking for advertising purposes. This Policy will be updated before any of them are added.

## 5. External Services and Processing Vendors

The Service uses:

- Cloudflare for hosting, content delivery, security protection, Turnstile abuse prevention, and routing email addressed to Contact to Gmail in a Google Account that we manage exclusively for business;
- Resend to deliver inquiry email and process the creator name, stage name, online handle, or legal name; email address; inquiry category; optional reference URL; inquiry details; email metadata such as destination and reply-to address; a tag identifying the source; and the consent record;
- Google Gmail in a Google Account that we manage exclusively for business to receive, retain, send, and respond to Contact-form inquiries sent through Resend, direct email forwarded through Cloudflare Email Routing, and business communications relating to quotations, contracts, production, acceptance review, payment, and refunds. Google processes information under the Google Terms of Service and Google Privacy Policy applicable to us;
- Google Drive in a Google Account that we manage exclusively for business to retain necessary quotations, contracts, invoice records, production materials, and related records. Access is restricted to the people who require it, and highly confidential information is encrypted before upload or protected by other measures appropriate to the risk;
- Stripe for payment processing, fraud prevention, payment-status confirmation, and refunds. Stripe directly handles full card details. We receive transaction identifiers, payment amounts, results, dates and times, refund status, and other information needed to administer transactions.

We do not use GitHub to store or process a User's personal data. If a private repository is used, it is limited to source-code management under a non-identifying project code and dummy data. We do not store a User's name, email address, activity name, handle, profile, biography, facial photograph or other identifying image, social-media URL, identifying domain, image or file metadata, contract or production communications, User-supplied Git author information, commit messages, branch names, Issue or Pull Request author information, CI or build logs, artifacts, contracts, identity-verification information, full payment details, or production-environment secrets in GitHub. Before changing this boundary, we will revise this Policy and the foreign-processing notice and provide any information or obtain any consent required by law.

Records requiring long-term retention, including contracts, invoices, and production materials, are stored primarily on an encrypted work device and, where necessary, on encrypted backup media. Gmail is used as a business-communication channel, and important communications are exported periodically to encrypted local storage.

At publication, open tracking and click tracking in Resend will be disabled for the Contact form.

Inquiry, contract, production, transaction, or technical information described in this Policy is sent to these providers to the extent necessary to provide the Service.

Cloudflare processes information as our service provider to deliver and protect the website, route email, and provide Turnstile abuse prevention. Cloudflare may also process certain technical signals under its own responsibility for purposes such as improving Turnstile security and performance.

Resend, Google, and Stripe process information for their respective purposes described above. General Google Terms of Service and the Google Privacy Policy apply to Google Gmail and Google Drive. In addition to processing payments on our instructions, Stripe may process information under its own responsibility for fraud prevention, legal compliance, and service improvement. Information may be processed outside Japan through the infrastructure of these providers or their subprocessors. We do not sell or rent personal information.

Before adding a new analytics, advertising, payment, storage, or collaboration service, we will reassess this Policy and any required consent or disclosure before use begins.

## 6. Disclosure to Third Parties

We do not provide personal data to a third party except where required by law, with the individual’s consent, or where a service provider processes information to the extent necessary to achieve the stated purposes.

Cloudflare processing associated with an ordinary page view is not based on Contact-form consent. If the relevant technical information constitutes personal data for KuroDev and its disclosure to a third party outside Japan is subject to Article 28 of Japan's Act on the Protection of Personal Information, KuroDev verifies its contract with Cloudflare, the Data Processing Addendum applicable to KuroDev, Cloudflare's certifications, and other measures, and uses a structure permitted by applicable law. KuroDev periodically verifies the implementation of those measures and provides information required by law when requested by an individual.

For foreign transfers of inquiry information associated with Contact-form submission, KuroDev provides the required advance information and obtains consent based on the separately displayed notice. Contact-form consent covers submission-stage processing by Cloudflare and Resend, and the receipt, retention, sending, and response through Google Gmail of the inquiry and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters. Where related follow-up communications are sent to the public contact address, the consent scope also covers routing of those communications through Cloudflare Email Routing to Gmail. The form will provide access to this Policy and the separate “Notice Regarding Processing of Personal Data Outside Japan.” The Contact form displays a separate Privacy Policy acknowledgment checkbox and foreign-transfer consent checkbox, each unchecked by default. Acknowledgment of the Privacy Policy records that the User reviewed the Policy and does not itself constitute consent to a foreign transfer. For Google Drive, Stripe, and any other service used during production or payment, we provide the necessary information and obtain explicit consent required by law before that service is used for the engagement. GitHub is not used as a recipient that stores or processes a User's personal data.

Initial ordinary inquiries are accepted through the Contact form as a general rule. Direct email is also used when the Contact form is unavailable, for requests concerning retained personal data, requests for operator information, security communications, and communications relating to an existing inquiry or contract. Before sending an ordinary inquiry, the sender will be able to review this Policy, the Notice Regarding Processing of Personal Data Outside Japan, and the consent wording applicable to that transmission. If an initial ordinary-inquiry email does not contain the required consent wording, we will perform only the minimum processing needed to direct the sender to resubmit through the current Contact form. Consent obtained after receipt will not be applied retroactively to processing that occurred when the email was received, and the email will be deleted to the extent legally and technically possible. A request concerning retained personal data, a request for operator information, a security communication, or another communication that must be accepted by law will not be rejected solely because the consent wording is absent and will be processed to the extent legally required.

For each processing stage, the separate notice will identify the formal legal name of each provider actually used; the recipient country in which that entity is located; separate storage and processing locations; an overview of the recipient country's personal-information protection system; the provider's protective measures; the information processed; the purpose of use; the subprocessors or how to confirm them; and the date of our review. We review this information and provider handling at least annually and when a material change occurs.

## 7. Retention and Deletion

The current Contact form does not store inquiry information in an application database for this website. It sends the information through Resend to Gmail in a Google Account that we manage exclusively for business. Email sent directly to the public contact address is forwarded to the same mailbox through Cloudflare Email Routing. We use the following retention periods and delete or anonymize information without delay after the applicable period using legally and technically available methods.

| Category | Standard retention period |
| --- | --- |
| General inquiry that does not result in a contract | One year after the final response |
| Operator-information request and reply record | One year after the reply |
| Quotation or contract-negotiation record | Three years after the final response |
| Book, financial-statement record, qualified invoice, or other tax or accounting record subject to a retention duty | The period required by applicable law for each record |
| Quotation, contract, invoice, delivery note, or other transaction document | The period required by applicable law for the year in which the document was created or received, ordinarily five or seven years |
| Payment or refund transaction record | The period necessary for tax, accounting, payment administration, and dispute handling |
| Specification, acceptance-review, change, cancellation, and other contract-performance evidence | Three years after the contract ends |
| Production material, preview, and working file | For a delivered engagement, one year after delivery; for an engagement that ends before delivery, one year after the contract ends |
| Refund-account information | 90 days after the refund is completed |
| Credentials and production-environment secrets entrusted by a User | Promptly after the work requiring the information ends or the contract ends, and no later than 30 days afterward |
| Record of consent concerning handling outside Japan or other consent required by law | The same period as the related inquiry, contract, production, or payment record |
| Record subject to a dispute or preservation of rights | For the period necessary to resolve the dispute or preserve the right |
| Ordinary security log controlled by us | 90 days after collection |
| Log relating to a security incident | One year after incident response is completed |
| Additional information obtained for identity or representative-authority verification | Promptly after verification and the required response are complete, and no later than 30 days afterward |

Under the standard Resend setting intended for publication, email data held by Resend is ordinarily retained for 30 days. Deletion after termination of the Resend account is governed by the data-processing terms applicable to us. We retain the version of the contract and settings applicable at publication.

Information required for a statutory retention obligation, litigation or dispute response, or preservation of legal rights may be retained exceptionally only to the extent and for the period necessary. It is deleted or anonymized after that purpose ends.

To the extent under our control, deletion or anonymization includes Gmail and Google Drive trash, version history, local backups, and copies held in external services. Backups controlled by an external provider remain subject to the terms, privacy policy, and technically available deletion scope applicable to us.

## 8. Security Measures

KuroDev is the person responsible for managing personal information. We apply the following security measures according to the nature and scale of the information handled:

- use accounts dedicated to business and not mixed with personal use for Gmail, Google Drive, and other business services; enable a passkey or multi-factor authentication where available; and keep recovery information separately from the work device;
- limit access to inquiry information to KuroDev and subcontractors who require access for the work;
- impose confidentiality and appropriate personal-data protection obligations on subcontractors and review their handling;
- manage API keys, credentials, and other secrets through environment variables or provider secret-management functions and not place them in a public repository or inquiry email;
- keep credentials, production-environment secrets, API keys, full card information, and identity documents entrusted to us out of Gmail and Google Drive; keep User personal data out of GitHub; and manage necessary credentials and secrets in an encrypted password manager;
- store contract and production records requiring long-term retention on an encrypted work device, use encrypted backups, and not place a User's name directly in a backup filename;
- encrypt communications using HTTPS;
- enable screen locking, operating-system and software updates, disk encryption, and anti-malware protection on work devices;
- review access rights and vendors at least annually and when a material change occurs;
- if leakage, loss, damage, or another incident is suspected, stop affected access, investigate impact, retain response records, and implement recurrence prevention; and
- report to the Personal Information Protection Commission and notify affected individuals where required by applicable law.

## 9. Requests Concerning Retained Personal Data

An individual or lawful representative may request, in accordance with applicable law, notice of purpose of use; disclosure; correction; addition; deletion; suspension of use; erasure; suspension of provision to third parties concerning retained personal data; or disclosure of records concerning provision to third parties.

A request may be submitted through the Contact form described in Section 10 or `contact@kuro-lab.com` and must identify the type of request, the information concerned, the requested method of disclosure, and a reply email address. We send an acknowledgement within five Business Days after receipt and respond without delay, in principle within 30 calendar days after receipt. Disclosure is made by the method requested by the individual. If disclosure by that method is difficult, we notify the individual and disclose by a written or electronic method available to us. If unavoidable circumstances require more than 30 calendar days, we notify the requester of the reason and expected response date before the original deadline and respond as soon as possible. No fee is charged for a request.

We first verify the individual or representative using contact details or information relating to the request that we already hold. Only where that information is not reasonably sufficient may we request the minimum additional information necessary. Additional information received for identity or authority verification is deleted promptly after the verification and required response are complete, unless retention is required by law.

If applicable law permits us to deny all or part of a request, we will state that outcome and any reason that the law permits us to provide.

## 10. Changes and Contact

We may change this Policy in response to changes in law, external services, Service functions, or operating methods. A material change will be announced on this website or by another appropriate method.

The business operator handling personal information is KuroDev, a sole proprietor. If `KuroDev` is an unregistered trade name, the trade name alone is not treated as the operator's legal name.

Questions or complaints about this Policy, requests for operator information, and requests under Section 9 may be submitted through this website's Contact form or `contact@kuro-lab.com`. A request for operator information must state that disclosure is requested and provide a working reply email address. We do not require identity documents for an operator-information request. Within five Business Days after receipt, we reply to that email address with the operator's legal name, current business address, and reachable telephone number.

If a person requests disclosure of operator information, we do not send that person a contract-acceptance notice, request payment, or begin production until disclosure is complete. If the request is made while a quotation remains valid, the validity period is extended until at least five Business Days have elapsed beginning on the day after disclosure.

The Japanese version of this Policy is the governing version. This English version is provided for convenience. If there is any inconsistency in interpretation or content between the Japanese and English versions, the Japanese version prevails.
