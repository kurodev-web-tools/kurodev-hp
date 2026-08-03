# kurodev-hp Guide runtime inventory 設計

- 作成日: 2026-08-01
- 対象branch: `codex/cloudflare-opennext-workers`
- 対象base: `43625b4a841fdae6652512a43cd2092cbb7062ff`
- 前提: OpenNext repository sliceはbuild済み。local Workerで日英Guideとsitemapがrequest-time filesystem依存により500

## 1. 観測済みblocker

`lib/guides/guide-loader.mjs` は `import.meta.url` からrepository絶対pathを作り、request時に `content/guides` と承認済み画像を `node:fs` で再検証する。OpenNext bundleにはそれらのsource fileが含まれず、Wranglerは `content/guides/publication-candidate.json` の `ENOENT` と `GuideValidationError` digest `3013836303` を記録した。

通常Next buildでは同じloaderがrepository filesystemを読めるため成功する。したがってGuide本文、publication hash、route定義の誤りではなく、build-time validationとWorker runtime data accessが同一moduleに結合していることが移行blockerである。

## 2. 選択肢

### A. Next output file tracingへGuide sourceを追加

差分は小さいが、Worker request時のfilesystem accessとbuild machine絶対pathを維持する。Windows local previewとremote Linux buildでpath形状が変わり、今回の根因を除去しないため採用しない。

### B. 検証済みruntime inventoryをtracked moduleとして生成

現行loaderでpublication candidate、Markdown、画像hash、route inventoryをbuild前に検証し、公開用のplain dataだけを決定的なES moduleへ生成する。Worker consumerはfilesystemをimportしないruntime facadeだけを読む。根因を除去し、生成差分もreviewできるため採用する。

### C. Guide Markdown / JSONを手書きstatic importへ置換

bundlerには取り込めるが、現行loaderと別のcontent pathが生まれ、hash-bound validationやsanitizationとのdriftを招くため採用しない。

## 3. 決定

選択肢Bを採用する。Guideの信頼境界は引き続きbuild時の現行loaderが所有し、Worker runtimeはその検証済み出力だけを消費する。

### 3.1 build-time validation

`lib/guides/guide-loader.mjs` は次を維持する。

- publication candidate packet IDと全file hashの照合
- approved image manifestと実画像hashの照合
- Markdown / front matter / link / image / route / locale / status validation
- 13件の承認済みlaunch inventory照合

検証を弱めたり、runtime成功のためにhash checkをskipしたりしない。

### 3.2 generated artifact

`scripts/generate-guide-runtime-inventory.mjs` を追加し、`loadGuideInventory()` が成功した後だけ `lib/guides/guide-runtime-inventory.generated.mjs` を生成する。

生成物は次の契約に固定する。

- 公開routeのrenderに必要なplain dataのみ
- source path、repository path、filesystem metadata、secret、環境値を含めない
- loaderが返す安定sort順を維持
- JSON互換の決定的出力
- generated headerとnamed exportだけを持つ
- Gitで追跡し、content変更時の差分をreview可能にする

generatorはwrite modeとcheck modeを持つ。check modeは現行sourceから生成したbytesとtracked artifactが一致しなければ非0終了する。

### 3.3 runtime facade

`lib/guides/guide-runtime.mjs` を追加し、generated artifactとpure selectorだけをexportする。

- `getGuideInventory()`
- `getGuideByRoute()`
- `getGuideStaticParams()`
- `getGuideCatchAllParams()`
- `getGuideAlternates()`
- `getGuideLanguageTarget()`

App route、Guide page、Guide component、sitemapはこのfacadeだけをimportする。facadeは `node:fs`、`node:path`、`import.meta.url`、raw Markdownをimportしない。

既存のbuild-time testsとgeneratorは `guide-loader.mjs` をimportする。pure selectorはfilesystem非依存の共有moduleへ一元化し、runtime facadeとloaderが必要なexportをre-exportして既存test APIを保つ。

## 4. command契約

`package.json` に次を追加する。

- `generate:guide-runtime`: tracked artifactを明示更新
- `check:guide-runtime`: sourceとtracked artifactの一致をread-only確認
- `prebuild`: `check:guide-runtime`

通常buildとOpenNext buildはstale artifactをfail closedにする。build中の自動writeは行わず、意図しない生成差分を隠さない。既存Guide sourceを変更する作業者は明示generate後にdiffをreviewする。

## 5. RED / GREEN

### Focused RED

新しいcontract testで次を先に失敗させる。

- runtime facadeとgenerated artifactが存在する
- runtime consumerが `guide-loader.mjs` をimportしない
- runtime facadeがfilesystem/path/raw contentをimportしない
- generated artifactが現行validated inventoryと同一である
- check modeがstale artifactを検出する

### GREEN

最小実装後にGuide loader tests、route inventory、OpenNext contractを通す。production behavior、Guide本文、publication hashes、route数、legal / consent / Contactには変更を加えない。

## 6. runtime QA

全build gate成功後にlocal Workerを起動し、375 / 1280 pxの実Chromeで再確認する。

- `/guide/getting-started` と `/en/guide/getting-started` がHTTP 200
- 日本語Guideの `x-kurodev-rendering: static-guide-islands`
- `/sitemap.xml` がHTTP 200でGuide URLsを含む
- Guide本文、metadata、画像、language target、navigation、console errorなし
- 5主要route、英語route、redirect、404、Contact fail-closed、OG、favicon、robots、security headers
- visible画像をscroll / decode後に非blank確認
- 既存5-route Lighthouse条件

## 7. 停止境界

- generated artifactがvalidationを迂回する場合は停止
- runtime facadeへfilesystem依存が残る場合は停止
- OpenNext bundleで別のadapter非互換が出た場合は推測修正せず証拠を記録
- WSL、remote build、Cloudflare upload / deploy、Worker/account変更へ拡大しない
- commit、push、PR、mergeは別承認

## 8. 完了条件

- runtime consumerからrequest-time filesystem / build絶対path依存が除去される
- tracked artifactが現行hash-bound sourceと一致する
- 通常NextとOpenNext buildが成功する
- 日英Guideとsitemapを含むlocal Worker smokeがgreen
- 既存公開境界、Guide content、legal / consent / Contact behaviorに差分がない
