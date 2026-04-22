# kurodev-hp Plan

## Current State
- `Next.js + App Router + Tailwind CSS` の初回土台は構築済み
- `Home / Profile / Web / Tool / Contact` の 5 ページは実装済み
- デスクトップ左サイドバー、モバイルナビ、ライト/ダーク切替は実装済み
- `Web / Tool` はローカル定数データから描画する構成に整理済み
- `Contact` は Resend + Cloudflare Turnstile で送信接続済み
- `metadata`、OG画像、favicon は `https://kuro-lab.com` 前提で設定済み

## Next Focus
### 1. Release Prep
- Cloudflare Pages 側に Resend / Turnstile / 宛先の環境変数を設定する
- 本番または preview で Contact 送信を確認する
- 公開前にリンク、文言、レスポンシブ表示を再確認する

### 2. Future Enhancements
- 必要に応じてページ別 metadata を追加する
- Web / Tool の未公開カードは公開URLができた時点でリンクを追加する
- アバターやキービジュアルの差し替え方針を決める

## Verification Baseline
- `npm run lint`
- `npm run build`
- ローカルで `npm run dev` を起動して 5 ページ導線とテーマ切替を確認

## Security Operations
- アプリ側では Contact API に Turnstile 検証、16KB の本文上限、外部API timeout、匿名最小ログを入れる
- 本番の連続送信対策は Cloudflare 側の rate limiting で扱う
- Cloudflare 側の推奨対象は `http.request.uri.path eq "/api/contact" and http.request.method eq "POST"`
- 初期設定は同一 IP から 1分あたり 3〜5 回程度を目安にし、Managed Challenge または一時 Block から開始する
- デプロイ後は `Strict-Transport-Security`、`X-Content-Type-Options`、`Referrer-Policy`、`X-Frame-Options`、`Permissions-Policy` が返ることを確認する
