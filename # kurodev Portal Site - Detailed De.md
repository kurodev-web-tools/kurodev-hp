# kurodev Portal Site - Detailed Design Specification (v2.0)

## 1. コンセプト
- **ブランド名:** kurodev
- **サイト役割:** 自社制作ツール・受託実績への「総合窓口（ポータル）」。
- **デザイン方針:** 「α（静寂・ミニマル）」。余白を贅沢に使い、Appleのような洗練された質感を追求。
- **スタンス:** AIを「魔法」ではなく「熟練の道具」として扱う技術力を提示。

## 2. ビジュアルアイデンティティ
### A. カラーパレット
| モード | 背景色 (Primary) | アクセントカラー | 境界線 / グロウ |
| :--- | :--- | :--- | :--- |
| **Dark** | Zinc-950 (#09090b) | Purple-500 (#a855f7) | Purple Glow |
| **Light** | Slate-50 (#f8fafc) | Cyan-600 (#0891b2) | Soft Gray Shadow |

### B. タイポグラフィ
- **欧文:** Geist Sans / Inter (幾何学的でモダンなサンセリフ)
- **和文:** Noto Sans JP (細めのウェイトで清潔感を演出)
- **演出:** キャッチコピーは文字間隔を広めにとり（tracking-widest）、可読性と高級感を両立。

## 3. ドメイン・ディレクトリ構造
- **Portal (Root):** `example.com` (親ドメイン。今回の制作範囲)
- **Sub-projects:** `v-match.example.com`, `a-z.example.com` などへリンク。
- **Tools:** `inventory.example.com` など、サブドメインでの展開。

## 4. レイアウト構造
### 固定左サイドパネル (Desktop: 260px)
- **構成:** - **Top:** `kurodev` ロゴ / アバター（アニメ調）
    - **Nav:** Home, Profile, Web, Tool, Contact
    - **Bottom:** テーマ切り替えスイッチ, SNS (X, GitHub), 著作権表示
- **挙動:** モバイル時はハンバーガーメニューに格納。

### 右メインコンテンツ
- **演出:** ページ遷移時はFramer Motionによる滑らかなフェードイン。
- **Layout:** 基本的に「Bento Grid（弁当箱）」形式のグリッドシステムを採用。

## 5. 各ページ詳細構成
### ① Home (Hero Section)
- **背景:** 抽象的なモーショングラフィック（1枚目/2枚目リファレンスのような波形・粒子）。
- **中央:** タイポグラフィ中心。`kurodev` ロゴ ＋ 「アイデアを、最短距離で形にする。」
- **CTA:** 「View Projects」ボタン（アクセントカラー）。

### ② Profile (1画面完結型カード)
- **Stats Card:** 「経験・幅」を軸にした数値。
    - Years of Computing: 8+ Years
    - Tech Ecosystem: 15+ Tools
    - Domains Covered: 3 Fields
- **Skills:** アイコン＋テキスト形式。Gemini, Claude, Cursor, Next.js, Supabase, Stripe 等。
- **Code Snippet:** 自身の哲学や経歴をコード形式（JSON/TypeScript風）で表示するデザインパーツ。

### ③ Web / Tool (実績ポータル)
- **Web:** v-match、A-Z テンプレートポータル等の大カード。
- **Tool:** 業務系ツール紹介。現在は「Roadmap」として開発進捗をステータスバーで表示。
- **Interaction:** カードホバー時にアクセントカラーの枠線が発光。

### ④ Contact (ご依頼・窓口)
- **Pricing:** 「参考価格ガイド」。LP制作、Webアプリ開発、自動化ツールの目安を提示。
- **Form:** シンプルな問い合わせフォーム。

## 6. 技術スタック
- **Frontend:** Next.js (App Router), Tailwind CSS
- **Animation:** Framer Motion
- **Themes:** next-themes (Dark/Light 切り替え)
- **Icons:** Lucide React, Simple Icons (各技術ロゴ)
- **Backend:** Supabase (必要に応じて問い合わせ管理に使用)


### モバイルレイアウト (Breakpoints: < 768px)
- **Navigation:** - サイドバーを非表示にし、上部固定ヘッダー（Sticky Header）に移行。
  - 右上のハンバーガーボタンからフルスクリーンのオーバーレイメニューを展開。
  - テーマ切り替えスイッチはヘッダー右端に常駐させ、ワンタップで切り替え可能に。
- **Content Area:**
  - 左右の余白（Padding）を 16px〜20px に調整し、可読性を確保。
  - Bento Grid は `grid-cols-1` (1カラム) を基本とし、高さのあるカードはアスペクト比を調整。
  - Stats カードなどは横スクロール（Snap Scroll）を採用し、縦長のスクロール距離を短縮。
- **Interaction:**
  - タップ時のフィードバック（ボタンの縮小アニメーション等）を強調し、モバイル特有の「触っている感」を演出。