# Creator Platform 国外取扱い説明・段階別同意記録設計

## 1. 文書状態

- 設計ID: `creator-platform-foreign-processing-consent-design-v1`
- 作成日: `2026-07-17`
- 設計承認: リポジトリ所有者が段階別同意方式、独立した日英2 route、同意後Turnstile実行、GitHub除外運用および実データpreview運用を承認
- 法務状態: `未承認・法務レビュー必須のAI草案`
- 実装状態: 未実装
- 公開状態: 公開不可

この設計承認は、国外取扱い説明の公開、法務routeの実装、ContactのPrivacyリンク・同意欄・直接メール導線の有効化、provider設定変更、commit、push、PR、merge、deployを承認しない。本文、事業者情報、取扱国、同意文言、記録方式は、人による法務レビューとTask 14 Step 0の公開日・版固定を完了するまで公開候補にならない。

## 2. 目的と基本方針

Creator Platformで利用する国外事業者を処理段階ごとに説明し、その段階で実際に必要な事業者だけについて明示的な同意と証跡を得る。

採用する方式は次のとおり。

1. Contactフォームでは、Privacy確認と国外提供同意を別々の未選択必須checkboxとして表示し、問い合わせ送信に利用するCloudflare、Resend、Googleだけを国外提供同意の対象にする。
2. 直接メールでは、実際のメール転送に利用するCloudflare Email RoutingとGoogle Gmailだけを対象にする。通常相談はContact障害時のfallbackとし、保有個人データ等の請求、事業者情報の請求、security連絡および既存の問い合わせ・契約に関する連絡は正式窓口として受け付ける。
3. GitHubは、利用者の個人データを保存または処理する提供先として使用しない。非公開リポジトリを使用する場合も、内部案件コードと実在の依頼者を推測できないダミーデータによるソースコード管理に限定する。実データ版はremoteを持たない別のローカル作業コピーで作成する。この境界を変更する場合は、利用開始前に設計・Privacy・国外取扱い説明へ戻り、再レビューする。
4. Stripeは、日本登録のStripeアカウントで決済を開始する前に別途同意を得る。
5. Contactの同意証跡は、オーナーへ届く問い合わせメールへserver-generated metadataとして付加する。専用の同意データベースは作らない。
6. Google DriveとStripeの同意証跡は、業務専用Gmailで送信した説明と依頼者の明示的な返信を同じスレッドで保存する。
7. 実データ入り最終previewは、案件別同意後にCloudflare Pages Direct UploadとCloudflare Accessで提供する。同意を得られない場合は、スクリーンショット、録画または画面共有へ切り替える。
8. ContactのTurnstileは、国外提供同意後にclient scriptを読み込み、送信操作時にexplicit executionする。Turnstile成功前に問い合わせ本文をContact APIへ送らない。
9. 重要なGmailスレッドは、関連記録の保持期間に従って暗号化したローカル保管先へ定期的に書き出す。

国籍や居住国は同意要否の判定に使用せず、Contactを利用する全員へ同じlocale対応の説明と未選択の同意欄を表示する。

## 3. 文書構成とversioning

国外取扱い説明は、Privacy本文とは独立して版管理する日英一対の文書とする。候補source pathとrouteは次のとおりだが、この設計だけでは追加・実装しない。

| Locale | Candidate source | Candidate route | Initial document ID |
| --- | --- | --- | --- |
| Japanese | `content/legal/ja/foreign-processing.md` | `/privacy/foreign-processing` | `creator-platform-foreign-processing-ja-v1` |
| English | `content/legal/en/foreign-processing.md` | `/en/privacy/foreign-processing` | `creator-platform-foreign-processing-en-v1` |

両文書はreciprocal alternateを持ち、各Privacy routeから同一localeの説明へリンクする。Contactのリンク先も現在のlocaleに一致させる。

この日英2 routeは、元のTask 12で承認された5 legal routeに含まれない。リポジトリ所有者は2026-07-17に独立route方式を設計上のスコープ拡張として承認したが、route実装、footer追加、Contactからのlink有効化、Task 14 Step 0の公開対象への昇格は承認していない。本文とprovider事実が人による法務レビューを通過し、別途実装許可を得るまでcandidate source/routeを実装しない。

文書front matterには最低限、`documentId`、`locale`、`documentType`、`status`、`approvalState`、`reviewRequirement`、`draftDate`、`effectiveDate`、`updateDate`、`equivalentDraft`、`reviewEvidence`、`providerReviewDate`を持たせる。公開前は既存5文書と同じく`blocked / unapproved / legal-review-required`、日付は`null`とする。

Privacy版と国外取扱い説明版は独立して記録する。初回公開version候補はすべて`1.0.0`とし、Privacy確認IDを`contact-privacy-acknowledgement-v1`、国外提供同意scopeを`contact-foreign-transfer-v1`とする。表現の変更、provider・国・目的・取扱情報・保護措置・subprocessor参照先の変更は、該当文書の版更新、必要に応じたscope ID更新、および再同意要否の法務判断を必要とする。

Privacy全文、国外取扱い説明全文および各checkbox文言は、UTF-8、LF改行、末尾改行1つへ正規化した値のSHA-256で固定する。Windows checkoutのCRLF差だけで承認hashが変わらないようにし、同意記録から当時の変更不能なsnapshotを照合できる状態を維持する。

## 4. 説明本文の情報設計

### 4.1 冒頭説明候補

Japanese:

> Creator Platformでは、サイトの配信・保護、問い合わせの送信・受信、制作および決済のため、日本国外にある事業者または日本国外で情報を取り扱う事業者のサービスを利用する場合があります。この説明では、処理段階ごとに、利用する事業者、取り扱う情報、目的、関係する国、個人情報保護制度に関する情報、事業者が公表する保護措置および再委託先の確認方法を示します。利用が未確定の事業者について、あらかじめ一括した同意を求めることはしません。

English:

> Creator Platform may use providers located outside Japan, or providers that process information outside Japan, to deliver and protect the site, send and receive inquiries, perform production work, and process payments. This notice identifies, for each processing stage, the providers used, the information processed, the purposes, the relevant countries, information about their personal data protection systems, the safeguards published by the providers, and how to check subprocessors. We do not request advance blanket consent for a provider whose use has not yet been determined.

### 4.2 Provider entryの必須項目

各entryは次の順序で記載する。

1. 処理段階
2. service名と正式な法人名
3. 取り扱う情報
4. 利用目的
5. 関係する国
6. 当該国の個人情報保護制度に関する情報
7. providerが公表する安全管理・保護措置
8. subprocessor一覧または公式な確認方法
9. 当方による最終確認日
10. 国を事前に特定できない場合の理由と代替情報

providerの約款、Privacy Policy、DPA、地域、subprocessor、保持期間または設定を、実際の契約・account・dashboardで確認していない場合は断定しない。公開候補には、確認済みの事実と「特定できない理由」を分けて記載する。

### 4.3 Provider matrix

| Stage | Provider candidate | Information | Purpose | Country treatment before publication |
| --- | --- | --- | --- | --- |
| Site delivery and protection | Cloudflare, Inc. | IP address and request/connection/security information needed for delivery and protection | Cloudflare Pages hosting, CDN and essential security | Account facts fixed by owner: Pages, Free plan, Web Analytics disabled, no Logpush or owner-controlled visitor log. Verify the Self-Serve agreement, DPA v6.4 acceptance/effect, Global CBPR/PRP scope and Article 28 structure before publication. |
| Contact Turnstile | Cloudflare, Inc. | Turnstile token, source IP, browser/device/security signals and verification result | Abuse and spam prevention | Load only after foreign-transfer consent and use explicit execution on submit. Keep pre-clearance disabled. Distinguish Cloudflare's processor role from processing it performs for its own stated purposes. |
| Contact email delivery | Plus Five Five, Inc. (`Resend`) | Inquiry fields, recipient/reply-to metadata and source tag | Deliver the inquiry to the owner | Recipient country: United States. Account data, email metadata, logs and API records are stored in the United States; routing and sending use the configured region. Recheck the actual region, DPA, retention, tracking and subprocessors. |
| Contact reception | Google LLC | Contact inquiry content and email metadata; no Contact attachment field | Receive, retain and reply using the business-dedicated Gmail account | Recipient country: United States. Storage/processing: Google data centers worldwide. Recheck the applicable general-account terms after `2026-07-30`. |
| Direct-email routing and later business communication | Cloudflare, Inc. / Google LLC | Email content, sender/recipient data, attachments, headers and routing metadata | Route `contact@kuro-lab.com` mail to the business-dedicated Gmail account and continue an inquiry or contract | Verify the actual DNS/routing configuration and applicable provider terms immediately before activation. |
| Production source management boundary | GitHub is not an active personal-data recipient | Non-identifying source code under an internal project code and non-identifying dummy data only; no User name, email, profile, supplied asset, URL, communications, User-supplied commit-author information, Issue/PR author information, or other User personal data | Private source-code version control and dummy preview without User personal data | Create the real-data deliverable in a separate local copy with no remote. If this boundary changes, stop before repository use and return to provider/entity/country/safeguard review and stage-specific consent design. |
| Access-controlled production preview | Cloudflare, Inc. (`Pages` / `Access`) | Display name, profile text, images, logos, public URLs, authorized viewer email, and access/security information | Deliver an interactive real-data preview only to the authorized client and protect it from unauthorized access | Use scope `cloudflare-production-preview-v1`; obtain engagement-specific consent before upload; use a dedicated internal-code project; disable Access within one Business Day and delete the temporary project within three Business Days after final approval or contract end. |
| Payment | Stripe Japan, Inc.; Stripe Payments Europe, Limited; Stripe, LLC | Payment/customer details entered into Stripe, transaction identifiers, amount, status, timestamps, fraud and refund data | Payment, fraud prevention, legal compliance and refunds | Treat the account country as Japan and the DPA transfer to Stripe, LLC as United States processing. Recheck the actual product, current Japan agreement, Irish processing entity, DPA, account configuration and subprocessors immediately before payment use. |

Google Driveは、契約・制作段階で利用する情報と利用条件が具体化した時点で、利用前説明の対象へ含める。Contact送信だけを目的とするcheckboxへ、Driveを未使用のまま含めない。

### 4.4 公式source registry

最終本文の確認には少なくとも次の一次資料を使用し、公開用review packetに確認日と該当箇所を記録する。

- 個人情報保護委員会「外国にある第三者への提供編」: <https://www.ppc.go.jp/personalinfo/legal/guidelines_offshore/>
- 個人情報保護委員会 FAQ Q5-8: <https://www.ppc.go.jp/all_faq_index/faq2-q5-8/>
- 個人情報保護委員会「諸外国・地域の法制度」: <https://www.ppc.go.jp/enforcement/infoprovision/laws/>
- Cloudflare Privacy Policy: <https://www.cloudflare.com/policies/privacy/>
- Cloudflare Self-Serve Subscription Agreement: <https://www.cloudflare.com/terms/>
- Cloudflare Data Processing Addendum: <https://www.cloudflare.com/cloudflare-customer-dpa/>
- Cloudflare Turnstile Privacy Addendum: <https://www.cloudflare.com/turnstile-privacy-policy/>
- Cloudflare Global CBPR: <https://www.cloudflare.com/trust-hub/compliance-resources/global-cbpr/>
- Cloudflare Turnstile widget configuration: <https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/>
- Cloudflare Pages Direct Upload: <https://developers.cloudflare.com/pages/get-started/direct-upload/>
- Cloudflare Pages preview protection: <https://developers.cloudflare.com/pages/configuration/preview-deployments/>
- Cloudflare Data Localization: <https://developers.cloudflare.com/data-localization/>
- Resend DPA: <https://resend.com/legal/dpa>
- Resend Privacy Policy: <https://resend.com/legal/privacy-policy>
- Resend Regions: <https://resend.com/docs/dashboard/domains/regions>
- Google Privacy Policy: <https://policies.google.com/privacy>
- Google Privacy FAQ: <https://policies.google.com/faq>
- GitHub Terms of Service: <https://docs.github.com/en/site-policy/github-terms/github-terms-of-service>
- GitHub General Privacy Statement: <https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement>
- Stripe Services Agreement: <https://stripe.com/legal/ssa>
- Stripe Privacy Center: <https://stripe.com/en-jp/legal/privacy-center>

公式sourceへのリンクだけで制度説明を代替せず、法務レビュー済みの要約を本文に載せる。

## 5. Contactフォームの同意設計

### 5.1 表示と操作

Privacy確認と国外提供同意を送信buttonの直前に別々の必須checkboxとして置き、両方の初期状態を未選択とする。Privacyと同一localeの国外取扱い説明を別タブに強制せず通常のlinkで開けるようにし、label全文をclick可能にしてkeyboard、focus-visible、forced-colorsに対応する。version、国外事業者名、所在国および目的を折りたたみ内へ隠さない。

Japanese Privacy acknowledgement candidate:

> プライバシーポリシー（version 1.0.0）を確認しました。

Japanese foreign-transfer consent candidate:

> プライバシーポリシーおよび「国外での個人データの取扱い」（各version 1.0.0）を確認し、本フォーム送信時にCloudflare, Inc.およびPlus Five Five, Inc.が入力情報を処理すること、ならびに問い合わせおよびこれに続く見積り、契約、制作、検収、支払、返金その他の関連業務連絡をGoogle LLCのGmailで受信、保管、送信および返信することに同意します。関連業務連絡を公開メールアドレスで受信する場合、Cloudflare Email Routingを通じて転送されることにも同意します。これらの外国事業者はいずれもアメリカ合衆国に所在します。

English Privacy acknowledgement candidate:

> I have reviewed the Privacy Policy (version 1.0.0).

English foreign-transfer consent candidate:

> I have reviewed the Privacy Policy and the Notice Regarding Processing of Personal Data Outside Japan, each version 1.0.0. I consent to the processing of the information entered in this form by Cloudflare, Inc. and Plus Five Five, Inc. when the form is submitted, and to the receipt, retention, sending, and response through Google LLC's Gmail of the inquiry and related follow-up communications concerning quotations, contracts, production, acceptance review, payment, refunds, and other agreed business matters. I also consent to the routing of related communications through Cloudflare Email Routing when they are sent to the public contact address. Each of these foreign providers is located in the United States.

未選択で送信した場合はproviderへ問い合わせ本文を送らず、DOM順で最初の未選択欄へfocusを移し、locale対応の個別field errorを関連付ける。国外提供同意を選択した後にTurnstile scriptを読み込み、送信時にchallengeをexplicit executionする。国外提供同意を外した場合はTurnstileをresetし、それ以前の処理を遡って取り消せるとは表示しない。client-side validationだけでなくserver側でも2つのexact consent value、document IDs、versionsおよびscopeを検証し、不一致・欠落時はfail closedとする。

### 5.2 Page-view processingとの境界

Cloudflareによる通常のsite配信・基本的なsecurity processingは、利用者がContact checkboxを選ぶ前から発生し得る。この処理を「checkboxによる同意後だけ発生する」と記載してはならない。

Contactの国外提供checkboxは、入力した問い合わせ情報をContact delivery chainへ送ることを対象にする。通常のpage deliveryはCloudflare PagesのFree planを使用し、Web Analytics、Logpushおよびowner-controlled visitor logは使用しない。通常配信について、Self-Serve契約、DPA v6.4、Global CBPR/PRP、Cloudflareのprocessor/controller区分および実際の識別可能性をprivate evidenceで確認し、人による法務レビューがArticle 28上の構成を承認できない場合は公開しない。

Cloudflareの契約・設定証跡はGitHubへ保存せず、暗号化local folderを主保管先とし、暗号化backupを別媒体へ保存する。Google Driveへ保存する場合はupload前に暗号化する。Free plan、Pages、Web Analytics無効、DPA版・適用記録、Global CBPR/PRP scope、pre-clearance無効、同意後explicit execution、Logpush不使用、Access有効化およびpreview削除を記録し、Task 14 Step 0前、年1回、ならびに契約・plan・設定の重要変更時に再確認する。repositoryにはpass/fail、確認日、次回確認期限およびprivate evidence保管済みというsanitized attestationだけを残す。

## 6. Contact同意記録

### 6.1 記録生成

serverはclientから表示用時刻やversion文字列を信用せず、許可されたlocaleとserver-side registryから次を生成する。

```text
Consent record
Privacy acknowledgement: accepted
Foreign-transfer consent: accepted
Recorded at: 2026-07-17T00:00:00.000Z
Source: contact-form
Locale: ja
Privacy acknowledgement ID: contact-privacy-acknowledgement-v1
Scope: contact-foreign-transfer-v1
Privacy policy: creator-platform-privacy-ja-v1 / 1.0.0
Foreign processing notice: creator-platform-foreign-processing-ja-v1 / 1.0.0
Covered processing: cloudflare-contact,resend-contact,google-gmail-contact,google-gmail-followup,cloudflare-email-routing-followup
Privacy acknowledgement copy SHA-256: <approved hash>
Foreign-transfer consent copy SHA-256: <approved hash>
Privacy snapshot SHA-256: <approved hash>
Foreign processing snapshot SHA-256: <approved hash>
```

- `Recorded at`は、serverがvalidation済みの送信要求と同意を受理したUTC ISO 8601時刻とする。
- 同意文、Privacyおよび国外取扱い説明は、Task 14 Step 0で固定した承認済み本文のSHA-256または変更不能なsnapshotへ結び付ける。
- 記録は問い合わせ本文と同じplain-text/HTML emailへ付加する。
- Resend tagへ氏名、email、document IDsまたは同意時刻を格納しない。
- 同意証跡のためにIP address、User-Agent、Turnstile token、raw provider responseを追加保存しない。
- Resend送信に失敗した要求について、専用databaseや追加logへ同意情報を残さない。画面は直接メールfallbackへ移る。
- 保存期間は、関連する問い合わせ・契約記録と同じ期間とし、重要なスレッドは暗号化したlocal storageへexportする。

clientは`privacyAcknowledged: true`、`foreignTransferConsent: true`、`contact-foreign-transfer-v1`、locale対応のdocument IDsおよび`1.0.0`だけを送る。serverはbody size、JSON、入力項目、2つの同意値、locale、document IDs、versions、scopeの順に検証し、一致後にだけTurnstile Siteverify、成功後にだけResendを呼ぶ。時刻、covered processingおよびhashはclient値を信用せずserver-side current registryから生成する。

### 6.2 Localeとversionの整合

日本語Contactは日本語Privacyと日本語国外取扱い説明、英語Contactは英語Privacyと英語国外取扱い説明のIDだけを受理する。clientから別localeや古いversionが送られても、server-side current registryと一致しなければ送信しない。

## 7. 直接メール

通常相談の直接メールはContact送信失敗時に案内し、同一localeの国外取扱い説明linkと、同意文をあらかじめ本文へ含む`mailto:`を表示する。保有個人データ等の請求、事業者情報の請求、security連絡および既存の問い合わせ・契約に関する連絡には正式なメール窓口を維持する。通常相談向けにはemail addressだけを単独表示して同意文を省略しない。

Japanese body candidate:

> プライバシーポリシーおよび「国外での個人データの取扱い」を確認し、このメールに含まれる情報がCloudflare, Inc.およびGoogle LLCを通じて、説明に記載された外国で取り扱われることに同意します。Privacy: creator-platform-privacy-ja-v1 / 1.0.0 / 国外取扱い説明: creator-platform-foreign-processing-ja-v1 / 1.0.0 / Locale: ja / Scope: direct-email-inquiry-v1 / 以下に相談内容を記載してください。

English body candidate:

> I have reviewed the Privacy Policy and the “Notice Regarding Processing of Personal Data Outside Japan,” and I consent to the information in this email being processed through Cloudflare, Inc. and Google LLC in the countries described in that notice. Privacy: creator-platform-privacy-en-v1 / 1.0.0 / Foreign processing notice: creator-platform-foreign-processing-en-v1 / 1.0.0 / Locale: en / Scope: direct-email-inquiry-v1 / Please enter your inquiry below.

`mailto:`にはformへ入力済みの氏名、email、URLまたは相談本文を自動転記せず、固定同意文と識別子だけを事前入力する。送信者は同意文を含むメールへ相談内容を自ら追記して送信する。受信後、Privacy ID/version、国外取扱い説明ID/version、locale、scopeをserver-side current registryに相当するowner運用記録と照合する。欠落、旧版、locale不一致または対象不明の場合、法令上の請求受付、security対応または再送案内に必要な最小限の処理を除き、依頼内容を実質的に利用しない。受信後の返信同意を、受信時に行われた国外取扱いへ遡及適用しない。送信者にはcurrent Contactフォームから再送するよう案内し、元のメールを法令上または技術上可能な範囲で削除する。

同意証跡として扱うemail metadataは、本文、受信日時、送信者、受信者、件名およびmessage identifierに限定する。通常のGmail受信・暗号化exportに含まれる原本以外に、`Received`、routing IP、認証診断その他allowlist外のheaderを同意証跡目的で抽出・追加保存しない。最終allowlistは人による法務レビューで確定する。

公開前に、`contact@kuro-lab.com`が実際にCloudflare Email Routingから対象Gmailへ転送されることと、経由providerをprivate configuration evidenceで確認する。構成が異なる場合は本文と同意文を先に更新し、再レビューする。

## 8. Google Drive・Stripeの後続同意とGitHub除外境界

### 8.1 共通手順

1. 利用開始前に、案件名、利用するservice、目的、対象情報、該当する国外取扱い説明の版とURLを業務専用Gmailから送る。
2. 無回答を同意と扱わない。
3. 依頼者から、対象serviceとdocument versionを特定した明示的な返信を受ける。
4. 同意後にだけ対象serviceへ情報を登録する。
5. 送信・返信を同じGmail threadで保存し、関連する契約記録とともに暗号化local storageへexportする。
6. Google DriveとStripeは各serviceの利用開始ごとに、そのserviceだけを特定した個別の説明と返信を取得する。複数serviceを一つの選択式または包括的同意へまとめない。

### 8.2 返信候補

Japanese:

> 「国外での個人データの取扱い」[document ID / version / URL]を確認し、本案件で[Google Drive / Stripe]を利用して、説明された情報が説明された国で取り扱われることに同意します。

English:

> I have reviewed the “Notice Regarding Processing of Personal Data Outside Japan” [document ID / version / URL] and consent to the use of [Google Drive / Stripe] for this engagement and to the described information being processed in the described countries.

Stripeでは、日本登録accountであること、契約主体が`Stripe Japan, Inc.`であること、および当時の契約で個人データ処理に関与するentityを、決済案内前に再確認する。GitHubでは、非識別の案件コードとソースコードだけを扱い、利用者の個人データがcommit、branch、Issue、Pull Request、repository metadata、添付または履歴へ入らない境界を案件開始前に確認する。

### 8.3 GitHubの物理的分離

- 非公開repositoryでも、repo名、branch、commit message、Issue、Pull RequestおよびDiscussionには内部案件コードだけを使う。
- Git authorはKuroDev自身の情報だけとし、依頼者との連絡をGitHub上で行わない。
- 活動名、氏名、email、profile、SNS URL、依頼者固有の文章、提供画像、logo、本人確認資料、契約・請求資料、secretを入れない。
- previewは実在の依頼者を推測できないダミー名称・画像・URLだけを使う。
- 実データ差し替えは`.git`履歴とremoteを持たない別local copyで行い、差し替え後のsourceまたはbuild artifactをGitHubへpushしない。
- push前にfile name、content、Git historyおよびimage metadataを確認する。誤って実データをremoteへpushした場合、そのrepositoryを案件用途で継続使用せず、clean repositoryを作り直す。
- 案件開始時と納品前にpass/failだけを記録し、依頼者情報をcheck記録へ書かない。

### 8.4 実データ入り最終preview

実データ入りpreviewにはGitHubを使わず、local build artifactを案件専用の一時Cloudflare Pages projectへDirect Uploadし、upload前にCloudflare Accessを有効化する。推測困難な公開URLだけをアクセス制限として扱わない。scopeは`cloudflare-production-preview-v1`とし、Cloudflare, Inc.、Pages、Access、対象情報、目的、米国での取扱いおよび保護措置を説明したうえで、業務専用Gmail threadの明示返信により同意を得る。

対象情報には、表示名、profile文章、画像、logo、公開URL、Access認証用email、access/security情報を含める。同意前は実データをuploadせず、拒否時はスクリーンショット、録画または画面共有へ切り替える。通常確認期間は通知から14日間とし、延長時は新しい確認期間を合意する。Access sessionは24時間、最終承認または契約終了後はAccess許可を1 Business Day以内に無効化し、一時Pages projectとAccess設定を3 Business Days以内に削除する。provider backupやsecurity logの完全即時削除は保証せず、適用契約と保持条件に従う。

Japanese reply candidate:

> 「国外での個人データの取扱い」[document ID / version / URL]を確認し、本案件の最終確認のため、Cloudflare PagesおよびCloudflare Accessを使用して、説明された情報がアメリカ合衆国所在のCloudflare, Inc.を通じて取り扱われることに同意します。Scope: cloudflare-production-preview-v1

English reply candidate:

> I have reviewed the “Notice Regarding Processing of Personal Data Outside Japan” [document ID / version / URL] and consent to Cloudflare Pages and Cloudflare Access being used for final review of this engagement and to the described information being processed through Cloudflare, Inc. in the United States. Scope: cloudflare-production-preview-v1

## 9. Error handlingとfail-closed条件

- Privacyまたは国外取扱い説明が`ready`でない場合、Contact Privacy link、checkbox、直接メールfallbackを有効化しない。
- locale pair、document version、provider groupまたは同意値が一致しない場合、APIはprovider deliveryを行わない。
- Privacy確認または国外提供同意がない場合、Turnstile scriptを開始せず、Contact APIへ問い合わせ本文を送らない。
- provider構成、契約entity、処理国、subprocessor参照先またはaccount設定を確認できない場合、そのstageを開始しない。
- Contact送信失敗時は成功表示をせず、同意文を含む直接メールfallbackだけを案内する。
- Cloudflare Accessを有効化できない場合、または`cloudflare-production-preview-v1`の案件別同意を得られない場合、実データ入りpreviewをuploadしない。
- GitHub remoteへ利用者個人データが入った場合、そのremoteを案件用途で継続使用しない。
- Gmail threadのexportに失敗した場合は対象記録を削除せず、暗号化local copyが確認できるまで再試行対象としてowner運用記録へ残す。providerや個人情報をapplication logへ追加しない。

## 10. Verification contract

実装が後日承認された場合、focused testsを先にREDで追加し、少なくとも次を検証する。

### Automated

- 日英の国外取扱い説明source、metadata、reciprocal alternateとPrivacyからのlink
- Privacy確認と国外提供同意の2 checkboxが未選択で、label、version、description、個別error associationを持つこと
- clientとserverの両方が未確認・未同意・未知version・未知scope・locale不一致を拒否すること
- 国外提供同意前にTurnstile script/challengeが開始されず、同意後のsubmit時にexplicit executionされること
- server-generated UTC timestamp、document IDs、scope、covered processingがemail本文に入ること
- IP、User-Agent、Turnstile token、raw provider responseが同意記録へ入らないこと
- Contact失敗時のlocale対応notice linkとprefilled `mailto:`
- GitHubとStripeがContact checkboxのprovider groupに含まれず、GitHubが利用者個人データのrecipient registryにも含まれないこと
- 公開準備未完了時は既存のPrivacy destinationがdisabledのままであること

### Real-browser QA

375pxと1280pxの日英Contactで、keyboardのみの操作、未選択送信、error focus、link遷移、同意後送信、success/error live region、fallback本文を確認する。forced-colorsとreduced-motionを確認し、horizontal overflowがないことを確認する。QAには架空のfixtureだけを使い、実provider送信や実在人物の個人情報を使わない。

browser network記録では、未同意状態でTurnstile scriptとchallengeが開始されず、国外提供同意後にscriptが読み込まれ、submit時にchallengeがexplicit executionされることを確認する。同意を外した場合はwidgetをresetし、その後のContact API送信を阻止する。

server側からCloudflareへ送る`siteverify` requestはbrowserから観測できないため、server-side integration testまたは秘密値を出力しないprivate server-side evidenceで、未同意要求では発生せず、serverが有効な同意とcurrent document registryを検証した後にだけ発生することを別途確認する。承認済みの同意後explicit execution方式と一致しない、または想定外のclient/server requestがある場合はContactを有効化しない。

### Provider and operational QA

- Cloudflare PagesのFree plan、Web Analytics無効、Logpush・独自閲覧log不使用、Self-Serve agreement、DPA v6.4、Global CBPR/PRP scope、Turnstile pre-clearance無効、Access保護およびpreview削除をprivate evidenceで確認する。GitHubは利用者個人データの除外境界を案件開始前と納品前に確認する。
- Resendのopen/click tracking無効、保持期間、subprocessor、送信先を確認する。
- Gmailの業務専用運用、MFA/passkey、共有なし、暗号化local exportを確認する。
- Stripeは日本登録accountとし、決済前に最新契約・Privacy Centerを再確認する。
- secrets、dashboard values、provider identifiers、browser storage、PIIをrepository、test output、QA documentへ記録しない。

## 11. 公開・実装ゲート

次のすべてが揃うまで実装と公開を停止する。

1. 元のTask 12に含まれない日英国外取扱いrouteの設計上のスコープ拡張は2026-07-17にowner承認済みである。ただし、別途route実装許可とTask 14 publication-candidate inclusion許可を得るまでcandidate source/routeを実装せず、Task 14 Step 0の条件付き対象へ昇格しない。公開利用の最終承認はTask 14内でexact dated/hash-bound sourcesに対して別途取得する。
2. 日英国外取扱い説明のexact source path、owner、approval state、effective date、update dateが確定している。
3. providerごとの正式法人名、処理段階、関係国、制度情報、保護措置、処理情報、目的、subprocessor確認方法、review dateが、人による法務レビューを通過している。
4. Contactの2 checkbox、直接メール、Google Drive、Stripe、Cloudflare実データpreviewのexact consent wordingと証跡方式、およびGitHubの利用者個人データ除外境界が、人による法務レビューを通過している。
5. Turnstileの同意後script load・explicit execution方式、Privacy確認ID、国外提供scope、document versionsおよびcanonical hash方式が法務・実装レビューを通過している。
6. 既存5法務文書と、明示的な追加route承認を受けた場合に限る日英国外取扱い説明の版・日付・fingerprintがTask 14 Step 0で固定され、ownerと法務レビューのexact approvalを得ている。
7. 実際のprovider account、契約entity、region、tracking、retention、routing、subprocessor、およびCloudflareのsanitized operational attestationを公開直前に再確認している。
8. route、footer、Contact Privacy destination、同意control、direct-email fallbackの実装について、別途明示的な許可がある。

この設計の作成と承認だけでは、上記のいずれも完了したものと扱わない。

## 12. Out of scope

- provider dashboard、DNS、Cloudflare、Resend、Google、GitHub、Stripeの設定変更
- 専用同意databaseまたはanalytics
- 国籍・居住国の収集
- 英語の特定商取引法表示
- 法務route、footer、Contactの実装
- commit、push、PR、merge、deploy、production verification
- 人による法務判断をAIで代替すること
