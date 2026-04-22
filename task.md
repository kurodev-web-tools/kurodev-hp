# task.md

## Current Board

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

### Next
- Lighthouse 再確認: favicon / brand icon 変更をデプロイ後、Desktop と Mobile を再計測する
- 本番 Contact 確認: Cloudflare Pages 環境変数、Turnstile、Resend 送信、受信先到達を確認する
- Cloudflare 運用設定: `/api/contact` の POST に rate limiting ルールを設定する
- 本番公開確認: 5ページ導線、OG画像、favicon、`robots.txt`、`sitemap.xml`、security headers を確認する
- SEO運用: Search Console 登録と sitemap 送信を行い、構造化データ追加は別バッチで検討する
- 依存関係確認: `npm audit --audit-level=moderate` は 14系維持では高 severity が残るため、Next.js 16系移行を別バッチで検討する

## Run Commands
- 開発サーバー: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
