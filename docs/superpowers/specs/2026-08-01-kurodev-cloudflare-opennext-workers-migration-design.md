# kurodev-hp Cloudflare OpenNext / Workers 移行設計

- 作成日: 2026-08-01
- 対象base: `origin/codex/creator-platform-redesign-preview` / `41953ce0461c58a50b7d62f2ae6b2006a9c1f2f1`
- 対象Next.js: `15.5.21`
- 目的: `@cloudflare/next-on-pages` の解決不能なbuild依存衝突を避け、既存機能と公開境界を保ったままCloudflare Workersへ移行できる状態を作る

## 1. 背景と観測事実

Cloudflare PagesのPreview buildは、リポジトリのアプリbuild開始前に失敗した。build command `npx @cloudflare/next-on-pages@1` が動的に取得した `@cloudflare/next-on-pages@1.13.16` と `wrangler@4.118.0` の `@cloudflare/workers-types` peer条件が衝突し、`npm ERESOLVE` になった。preview branch未設定やアプリ実装の回帰は原因ではない。

Cloudflare公式の現在のNext.js full-stack手順はPages用 `@cloudflare/next-on-pages` ではなく、Workers用 `@opennextjs/cloudflare` を案内している。2026-08-01に公式npm metadataを確認した結果、`@opennextjs/cloudflare@1.20.2` は `next >=15.5.21 <16 || >=16.2.11` と `wrangler ^4.86.0` をpeer条件に持つ。`wrangler@4.118.0` はNode.js `>=22.0.0` を要求し、確認済みのCloudflare build image v3既定Node.js `22.16.0` はこれを満たす。

参照:

- [Cloudflare Workers: Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
- [OpenNext environment variables](https://opennext.js.org/cloudflare/howtos/env-vars)

## 2. 決定

Next.jsは `15.5.21` のまま維持し、Cloudflare実行基盤だけをPagesからOpenNext adapterを使うWorkersへ移す。自動migration commandはR2作成などの外部副作用や広い変更を含み得るため使用せず、必要な設定を手動で最小追加する。

既存Pages projectとproduction domainは、Workers previewの全gateが通り、別途activation承認が出るまで変更しない。この設計の実装、ローカル検証、PR、Workers preview作成、domain切替、activationはそれぞれ承認境界を分離する。

## 3. ゴール

- lockfileで再現可能なOpenNext buildを追加する
- Next.js `15.5.21`、PostCSS `8.5.23`、Sharp `0.35.3` の検証済み境界を維持する
- middlewareによるstatic islands、Contact API、OG image、画像表示、redirect、security headersの挙動を維持する
- production dependency audit 0件を維持する
- 実ChromeでWorkers runtime上の主要公開面を確認する。build成功だけでは移行完了としない
- 既存Pagesをrollback先として残したままpreviewから段階移行できるようにする

## 4. 非ゴール

- Next.js 16への更新
- R2 incremental cache、Cloudflare Images、KV、D1、Queues、Analytics/Observabilityの追加。Cloudflare ImagesまたはAccessが必要になった場合は別承認に切り出す
- Contactの仕様、法務文言、同意順序、fingerprint、公開URL、rate limit方針の変更
- 実Turnstile/Resend呼び出し、実PII利用
- Cloudflare project設定変更、deploy、domain切替、production activation
- 既存Pages projectの削除または無効化

## 5. 最小変更

### 5.1 dependencyとscripts

`devDependencies` に次をexact pinで追加し、`package-lock.json` を更新する。

- `@opennextjs/cloudflare`: `1.20.2`
- `wrangler`: `4.118.0`

`package.json` にはローカル成果物を作る次のscriptだけを追加する。

- `build:cloudflare`: `opennextjs-cloudflare build`
- `preview:cloudflare`: `opennextjs-cloudflare preview`

deploy scriptはこのsliceでは追加しない。誤実行を避け、deployは後続の明示承認後にexact commandと対象Worker名を確認して実施する。

### 5.2 adapter設定

次を追加・更新する。

- `open-next.config.ts`: `defineCloudflareConfig()` の最小設定
- `wrangler.jsonc`: 下記のexact契約を設定
- `.gitignore`: `.open-next/` を追加
- `next.config.mjs`: `images.unoptimized: true` を追加し、外部画像bindingなしで既存画像を原寸配信する。表示・転送量・Lighthouseがgateを満たさない場合はCloudflare Imagesを別承認に切り出す。`initOpenNextCloudflareForDev()` はbindingを使わないため追加しない
- `app/api/contact/route.js`, `app/opengraph-image.js`: OpenNext公式要件に従い `export const runtime = "edge"` だけを削除し、Node runtimeへ移す。処理内容は変更しない

`wrangler.jsonc` のrepository契約は次とする。

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "kurodev-hp-opennext",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-08-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "kurodev-hp-opennext"
    }
  ],
  "workers_dev": true,
  "preview_urls": true
}
```

`global_fetch_strictly_public` はmiddlewareの同一origin source fetchを通常の公開requestとして扱うために固定する。`WORKER_SELF_REFERENCE.service` は `name` と一致させる。`2026-08-01` は `process.env` populationを含む必要なNode互換既定日以後である。

Worker名・`workers_dev`・public preview URLは外部resource topologyでもある。上記は推奨値であり、外部mutation前にCloudflare account内の名前衝突をread-only確認し、ownerがこの4点を一括承認する。repositoryへの設定追加だけではWorker作成・upload・deployを許可しない。

## 6. runtime互換性の扱い

### Middleware / static islands

`middleware.js` は内部source fetch後に5公開routeのHTMLを変換する。OpenNext buildとWorker previewで次をcharacterizeする。

- `/`, `/tools`, `/creator-site`, `/contact`, `/guide/getting-started` のHTTP 200
- `x-kurodev-rendering` の期待値
- locale header伝播と `/en` 表示
- source fetchが再帰せず、生成HTMLが欠損しないこと

`global_fetch_strictly_public` とquery markerによりsource fetchが同じ変換へ再入しないことを必須確認する。失敗時はrouting再設計へ自動拡張せず停止する。

### Edge routes

OpenNextは `export const runtime = "edge"` を未対応としているため、`app/api/contact/route.js` と `app/opengraph-image.js` から宣言だけを削除し、Node runtimeへ移す。Contact APIのvalidation、同意、Turnstile先行、Resend後続、sanitized loggingは変更しない。対象routeの既存contract testsを変更前後で通し、Worker runtime smokeを必須とする。

### Environment variables / secrets

既存の変数境界を維持する。

- build/client: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- runtime secret: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`
- runtime configuration: `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`

値のsourceと優先順位を次に固定し、値をcommit・ログ・報告へ出さない。

1. 通常Next build: 既存のgitignored `.env*`
2. local Worker preview: gitignored `.dev.vars` または明示 `--env-file`。provider secretは入れず、Contact APIのfail-closedを確認する
3. Workers Builds: build variables。`NEXT_PUBLIC_TURNSTILE_SITE_KEY` が必要なbuildだけに適用する
4. remote Worker runtime: vars/secrets。Previewにはprovider secretを登録しない

Workers Buildsのbuild変数とWorker runtime secret/varsは別管理なので、外部mutation前にread-only inventoryを取り、名前と有無だけ照合する。コピー・登録は別承認とする。Preview URLは公開され得るため、Accessの別承認がない限りprovider secretや実PIIを置かず、Contactはfail-closedのままにする。secret登録command自体が新versionをdeployし得るため、secret登録とupload/deployを同じ外部変更承認に含める。

### Image optimization

Cloudflare Imagesや追加bindingは導入せず、最初のrepository sliceでは `images.unoptimized: true` により画像表示を維持する。実画面で非blank画像、転送量、既存Task 14のLighthouse条件を再確認する。性能条件を満たさない場合は、Cloudflare Imagesのplan・費用・data boundaryを確認して別承認を得るまで停止する。

## 7. 検証gate

### Baseline characterization

- 旧Pages buildの `ERESOLVE` は本書§1の過去観測として扱い、参照不能な外部logを実行gateにはしない
- 現行の通常Next build、テスト、production auditがbaselineでgreenであること
- Edge runtime宣言削除前にContact/OGの既存出力contractをtargeted testsで固定すること

### GREEN local

dependency install後、次を順に実行する。

1. Contact/static-islands関連のtargeted tests
2. `npm test`
3. `npm run lint`
4. `npm run diagnose:react`
5. `npm run build`
6. `npm audit --omit=dev`
7. `npm run build:cloudflare`
8. `git diff --check`

OpenNextはWindowsでのローカル実行に制約がある。まずこのworktreeのGit Bashで実行し、platform由来で失敗した場合はコードを推測修正せず停止する。WSL/LinuxまたはCloudflare Workers Buildsでの再検証は、環境または外部build実行の追加承認を得て行う。

### 実Chrome smoke

`npm run preview:cloudflare` がローカルで起動できた場合、実Chromeの375px / 1280pxで次を確認する。

- 5主要routeと英語route、redirect、404
- static islandsの表示、navigation、console errorなし
- Contactの同意前送信不可、同意後payload、locale、validation
- Turnstile/Contact/Resendはbrowser interceptionを使い、実providerへ到達しない
- OG image、favicon、`robots.txt`、`sitemap.xml`
- 全画像の非blank表示、転送量、既存Lighthouse条件
- security headers

preview Workerへのupload/deploy smokeは外部変更なので、このローカルgateには含めない。ローカルpreviewがplatform制約で起動できない場合、repository sliceは「build済み・runtime未検証」として停止し、Workers移行検証完了とは扱わない。

## 8. 停止条件とrollback

次のいずれかで変更拡大を止め、証拠と選択肢を報告する。

- OpenNext dependency導入でproduction auditが再発する
- 通常Next buildまたは既存testsが回帰する
- middleware、Edge routes、Contact、image optimizationにadapter非互換がある
- Cloudflare Images/R2等の未承認resourceが必要になる
- Windows外の実行環境またはCloudflare上のbuildが必要になる

rollbackは「既存Pages projectとdomainを一切変更しない」ことで担保する。ローカル実装が不成立なら、このtask branch内の今回変更だけを元に戻し、既存worktree・PR #19・公開環境には触れない。

activation前には、現在のPages custom domain/route/DNS状態を値の秘匿を保って記録し、次を含むexact rollback runbookをowner承認する。

- trigger: 主要routeの5xx/表示欠損、Contact障害、security header欠落、重大なperformance回帰
- action: Worker custom domain/routeを外し、記録済みPages mappingへ戻す
- actor: activation担当ownerと、Cloudflare account操作可能なbackup担当
- success: 5主要route、headers、OG、Contact fail-closedまたは送受信の再確認
- secrets: Pages側の既存値を保持し、rollback時にWorkersから値を抽出・転記しない

## 9. 後続の承認付きactivation順序

1. dependency install、manifest/lockfile、adapter/runtime変更を含むrepository実装
2. 全ローカルgate。platform制約があればruntime未検証として停止
3. commit / push / PR作成
4. Cloudflare accountのread-only inventory: Worker名衝突、plan、Workers Builds、preview公開性、Logs/Web Analytics、data processing、custom domain、既存 `/api/contact` rate-limit ruleのWorker route適用可否
5. Worker identity、`workers_dev`、preview URL、Access有無、build branch、upload/deploy、secret方針を一括承認
6. 隔離したpreview Workerへprovider secretなしでuploadし、fail-closedを確認
7. preview URLで実Chrome QA。UI requestはbrowser interception、Worker APIはsecret未登録によるfail-closedとし、実provider fetchは行わない
8. Workers利用条件/data boundary、legal date、consent fingerprint、owner approval、rate-limit適用をactivation前に承認
9. production runtime vars/secrets、custom domain切替、exact rollback runbookを承認
10. activation直後の5 route、headers、OG、Contact provider/受信、rate limiting確認
11. 安定確認後にのみ旧Pagesの扱いを別判断

## 10. 2026-08-04予定への影響

8月4日公開を維持するには、8月1日にローカルgate、続けてpreview Workerの作成承認とQA、遅くともactivation前日までにdomain/secret/rate-limit/rollback手順の確認が必要になる。Windows制約、middleware、image、Contactのいずれかがpreviewで不成立なら、Next 16へ広げず公開日を延期する。

activation日が変わる場合は、日付を含む法務表示、consent fingerprint、owner approval記録、Contact同意順序、Turnstile/Resend、主要routeと公開前QAを新しい日付・buildで再実施する。

## 11. 完了条件

### Repository slice完了

- repository差分が本書「最小変更」の範囲内
- 通常Next buildとOpenNext buildがともに成功
- `npm audit --omit=dev` が0件
- local Worker previewが起動できる場合は実Chrome smokeがgreen。Windows制約の場合はruntime未検証を明記して停止
- 既存のlegal/consent/public boundaryに差分なし
- Cloudflareの設定変更、deploy、activationが明示承認なしに行われていない

### Workers移行検証完了

- 承認済みlocalまたはremote Worker runtimeで実Chrome smokeの全項目がgreen
- provider secretなしのpreview Contactがfail-closed
- 公開topology、Workers利用条件/data boundary、rate limiting、rollback runbookがowner承認済み
- production secret登録、domain切替、activationはまだ実施していない
