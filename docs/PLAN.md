# kurodev-hp Plan

## Current State
- `Next.js + App Router + Tailwind CSS` の初回土台は構築済み
- `Home / Profile / Web / Tool / Contact` の 5 ページは実装済み
- デスクトップ左サイドバー、モバイルナビ、ライト/ダーク切替は実装済み
- `Web / Tool` はローカル定数データから描画する構成に整理済み
- `Contact` は UI とクライアント側バリデーションまで実装済み

## Next Focus
### 1. Content Hardening
- `lib/site-data.js` の案件名、要約、ステータス、タグを実データへ寄せる
- `href` が `#` のままのカードを実 URL または仮公開方針に置き換える
- `Profile` と `Home` の文言を公開向けに最終調整する

### 2. Contact Integration
- 送信先を決める
- 最小構成なら `mailto`、本実装なら `Route Handler` + 保存先のどちらかで固定する
- 送信完了状態、失敗時表示、スパム対策の扱いを決める

### 3. Visual Polish
- ヒーローと主要カードの装飾を少しだけ強める
- OG、favicon、metadata を追加する
- アバターやキービジュアルの差し替え方針を決める

### 4. Release Prep
- 必要なら `README` に起動手順を追加する
- デプロイ先を決めたうえで環境差分を整理する
- 公開前にリンク、文言、レスポンシブ表示を再確認する

## Verification Baseline
- `npm run lint`
- `npm run build`
- ローカルで `npm run dev` を起動して 5 ページ導線とテーマ切替を確認
