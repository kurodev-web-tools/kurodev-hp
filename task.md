# task.md

## Current Board

### Creator Platform redesign — local pre-merge checkpoint

#### Verified locally
- Task 14 Step 0の固定済み7法務文書と6 Contact consent文面を、owner-designated AI-assisted internal substituteとして扱う承認境界を記録（人間法務・弁護士レビュー済みとは表現しない）
- Next.js `15.5.21` / React `18.3.1` / React DOM `18.3.1` / eslint-config-next `15.5.21`へ更新
- `npm test` 105 / 105、lint、React diagnostics、41-page production buildを最終差分で再確認
- Next 15のstreaming metadataを初期document headへ固定し、Lighthouse SEOを全対象・全runで100へ復旧
- 言語切替のvisible labelをaccessible nameへ含め、Lighthouse Accessibilityを全対象・全runで100確認
- page-family CSSのroute ownership、production CSS inline化、server-owned shell copyにより共通client境界を縮小
- `/`、`/tools`、`/creator-site`、`/guide/getting-started`、`/contact`をroute別static HTML + behavior islandへ拡張し、App Router bootstrap / Flight payloadを除去
- 5routeすべてのmobile / desktop Lighthouse 3-run中央値でPerformance / Accessibility / Best Practices / SEO 100を確認。`/guide/getting-started` mobileはLCP 850 ms、TBT 0 ms
- 36routeを375 / 768 / 1024 / 1280 pxで実ブラウザ検証し、status、metadata、h1、lang、overflow、console、外部通信を確認
- Contact consent、synthetic Turnstile、direct-email fallback、forced colors、reduced motion、keyboard/focusを架空fixtureのみで検証
- Chromium上限を超える375 px法務ページ5枚を分割captureで修復し、Contact見出しの1024 px孤立改行を固定2行へ修正
- `docs/KURODEV_CREATOR_PLATFORM_QA.md`へTask 14のsanitized pre-merge evidenceを記録
- `DEP-AUDIT-001`をNext.js `15.5.21`配下限定のPostCSS `8.5.23` / Sharp `0.35.3` overrideで解消し、production audit 0件を確認
- override後にPostCSS実処理、Sharp/libvipsによる承認済みPNG読取、105 / 105 tests、lint、React diagnostics、41-page buildを再確認
- `/`、`/tools`、`/creator-site`、`/guide/getting-started`、`/contact`を375 / 1280 pxの実Chromeで再確認し、overflow、broken image、console error、外部通信が0であることを確認
- Cloudflare Pages production / previewがbuild system v3、`NODE_VERSION` overrideなしであることをread-only確認し、既定Node.js `22.16.0`がSharp `0.35.3`の`>=20.9.0`要件を満たすことを確認

#### Release blockers
- 現在のlocal pre-merge scopeに残存blockerなし。`DEP-AUDIT-001`はrepository owner承認済みの限定overrideと全ローカル検証で解消

#### Explicitly pending
- final preview-to-`main` PR、merge、deploy、2026-08-04 production activation
- Task 15 post-merge production verification（live providerを含む確認は別途承認が必要）

### Done
- `Next.js` プロジェクトを新規構築
- `Home / Profile / Web / Tool / Contact` の 5 ページを初回実装
- 共通レイアウト、サイドバー、モバイルナビ、テーマ切替を実装
- Bento ベースの共通カード UI を実装
- `Contact` の UI と入力バリデーションを実装
- `npm run build` 成功を確認
- `Web / Tool` 下段補足セクションを Home 下部と同じ軽量な罫線区切り構造へ変更
- デスクトップ背景にテーマ連動の薄い Hexagon hover glow を試験導入
- 共通パネルを控えめなガラス風へ調整
- カード hover の glow を抑え、パネル透過を少し強めに調整
- Profile のコードカードをエディタ風の syntax highlight 表現へ調整
- Home ヒーローの重複導線説明を削除し、初期表示の縦量を圧縮
- Home を制作相談入口として公開用文言へ調整
- Profile を制作実行者として公開用文言へ調整
- Web を公開済み実績と次期テンプレート計画の一覧として公開用文言へ調整
- Tool を匿名実績PWAと準備中ツールの一覧として公開用文言へ調整
- Contact を制作相談の受付入口として公開用文言へ調整
- Contact を Resend + Turnstile で送信接続
- Cross-page の metadata、OG、favicon を公開URL前提で追加
- README に起動手順、環境変数、公開前チェックを追加
- セキュリティ観点の静的確認を実施: secret混入、Contact API入力検証、Turnstile/Resend連携、公開ファイル、外部リンク、依存関係、ビルドを確認
- Next.js 14系依存を `next@^14.2.35` / `eslint-config-next@^14.2.35` に明示更新し、lint/build 成功を確認
- 全ルートに基本 security headers を追加: HSTS、nosniff、Referrer-Policy、X-Frame-Options、Permissions-Policy
- Contact API に 16KB 本文上限、Turnstile/Resend timeout、匿名最小エラーログを追加
- `docs/PLAN.md` に Cloudflare rate limiting と本番 security headers 確認手順を追加
- Glow Shift テーマ切替計画を実装: 背景・カード・文字色の 300ms transition、Hexagon glow の遅延色変化、Toggle icon の fade/scale/rotate、prefers-reduced-motion 抑制を追加
- SEO公開前基礎強化を実装: root canonical 固定解除、ページ別 metadata/canonical、`robots`、`sitemap` を追加
- `https://kuro-lab.com` で公開完了
- Lighthouse 初回結果を確認し、favicon 軽量化と表示用 `brand-icon.png` 分離を実施
- Lighthouse 再計測で Mobile Performance 81 -> 96 を確認し、結果要約を `docs/LIGHTHOUSE_REPORT.md` に追記
- モバイルナビを下部 fixed navigation へ変更し、上部ヘッダーはブランド表示とテーマ切替に簡略化
- A11y基礎修正: primary button contrast と Home の heading order を修正
- Home ヒーローを小規模サイト制作、公開後改善、問い合わせ整理が伝わる文言へ調整
- `HP-portal` 実績カードに成果・運用価値の短い特徴と日本語リンク文言を追加
- Contact に予算未定、相談時に書く内容、返信目安の短い案内を追加
- モバイル下部ナビとフォーム末尾の重なりを避けるため、スクロール領域の下余白を調整
- 検証: `node node_modules/next/dist/bin/next lint` 成功、`node node_modules/next/dist/bin/next build` 成功
- 追加コメント対応: `HP-portal` の特徴表示を縦リスト化し、`104 templates` を記載
- 追加コメント対応: Contact の `before contact` 3項目をデスクトップでも縦積みに調整

### Next
#### UI Improvement Batch
- モバイル操作確認: 下部ナビの5ページ遷移、active表示、スクロール連動表示、Contactフォーム下部の重なりを確認する

#### Production Operations
- 本番 Contact 確認: Cloudflare Pages 環境変数、Turnstile、Resend 送信、受信先到達を確認する
- Cloudflare 運用設定: `/api/contact` の POST に rate limiting ルールを設定する
- 本番公開確認: 5ページ導線、OG画像、favicon、`robots.txt`、`sitemap.xml`、security headers を確認する
- SEO運用: Search Console 登録と sitemap 送信を行い、構造化データ追加は別バッチで検討する
- 依存関係確認: `npm audit --audit-level=moderate` は 14系維持では高 severity が残るため、Next.js 16系移行を別バッチで検討する

## Run Commands
- 開発サーバー: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
