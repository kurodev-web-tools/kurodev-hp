export const aboutContactContent = {
  ja: {
    about: {
      hero: {
        eyebrow: "About kurodev",
        titleLines: ["活動の流れを理解して、", "道具とWebの形にする。"],
        body: "kurodevは、クリエイターの準備、発信、問い合わせで迷いが生まれる場所を見つけ、ツールとWeb制作で整えます。"
      },
      purpose: {
        eyebrow: "Purpose",
        title: "つくるものより先に、何を分かりやすくするかを決める。",
        body: "画面や機能を増やすこと自体を目的にせず、活動する人と情報を受け取る人の両方が、次の行動を選びやすい状態を目指します。",
        note: "技術は目的に合う形を実現するための手段として扱い、公開できる成果と現在の対応範囲を基準に案内します。"
      },
      creatorFocus: {
        eyebrow: "Creator focus",
        title: "日々の準備と、外へ伝える場所をひとつの流れで考える。",
        body: "Kuro Stream Kitの開発で扱う配信準備の流れと、プロフィール・実績・問い合わせをまとめるWeb制作を、別々の表面ではなく活動のつながりとして捉えます。"
      },
      process: {
        eyebrow: "Process",
        title: "確認から公開後の改善まで、小さな判断を積み重ねる。",
        items: [
          { id: "clarify", title: "目的と現在地を確認", body: "今の活動、届けたい相手、迷いが生まれている導線を整理します。" },
          { id: "structure", title: "情報と操作の順序を設計", body: "必要な内容と、読み手や利用者がたどる順序を決めます。" },
          { id: "build", title: "画面と動作を実装", body: "複数の画面幅と操作方法で使える形へ組み立てます。" },
          { id: "improve", title: "公開後の改善を検討", body: "確認できた課題を、小さくレビュー可能な単位で見直します。" }
        ]
      },
      scope: {
        eyebrow: "Supported scope",
        title: "現在案内している制作範囲",
        body: "公開済みの取り組みと、現在のサービスページで確認できる範囲に限定して案内します。",
        items: ["クリエイター向けのWebツール", "活動情報をまとめるクリエイターサイト", "小規模サイトとランディングページ", "公開後の導線・文言・更新方法の改善"]
      },
      flagship: {
        eyebrow: "Verified work",
        title: "Kuro Stream Kitから、現在の取り組みを見る。",
        body: "配信予定、告知画像、SNS投稿素材を整える公開確認済みのツールと、その設計・実装範囲を紹介しています。",
        actions: [
          { id: "case-study", label: "ケーススタディを見る", href: "/works/kuro-stream-kit" },
          { id: "tools", label: "公開中のツールを見る", href: "/tools", variant: "secondary" }
        ]
      }
    },
    contact: {
      intro: {
        eyebrow: "Contact",
        titleLines: ["決まっていることから、", "制作相談を始める。"],
        body: "クリエイターサイト、既存サイトの改善、ツールやWebサービス制作について、分かる範囲でお知らせください。",
        supportLead: "Kuro Stream Kitの使い方や不具合の連絡は、制作相談と分けて受け付けています。",
        supportAction: "Kuro Stream Kitへフィードバックを送る"
      },
      reassurance: {
        title: "相談前に決め切る必要はありません。",
        items: [
          { id: "incomplete", title: "未確定でも受付", body: "予算、公開時期、必要なページが未定でも、現在の状況から送れます。" },
          { id: "activity-name", title: "活動名で送信可能", body: "本名ではなく、公開している活動名や屋号で相談できます。" },
          { id: "reply", title: "返信について", body: "内容を確認し、返信できる場合にメールで連絡します。返信時期は確約していません。" },
          { id: "private", title: "内容は公開しません", body: "送信内容は問い合わせへの対応に使用し、サイト上へ掲載しません。" },
          { id: "contract", title: "送信だけでは契約になりません", body: "制作範囲や条件は、相談後に双方で確認して決めます。" }
        ]
      },
      form: {
        eyebrow: "Inquiry form",
        title: "制作について相談する",
        body: "必須項目と20文字以上の相談内容を入力してください。参考URLは任意です。",
        required: "必須",
        optional: "任意",
        labels: { name: "お名前・活動名", email: "メールアドレス", category: "相談カテゴリ", referenceUrl: "参考URL", message: "相談内容" },
        placeholders: { name: "活動名またはお名前", email: "name@example.com", category: "カテゴリを選択", referenceUrl: "https://example.com", message: "現在の状況、相談したいこと、決まっている範囲をご記入ください。" },
        messageGuidance: "20文字以上で入力してください。",
        consentLegend: "送信前の確認と同意",
        turnstile: "認証を完了できませんでした。もう一度お試しください。",
        submit: "送信する",
        sending: "送信中…",
        privacyLink: "プライバシーポリシーを開く",
        foreignProcessingLink: "国外での個人データの取扱いを開く",
        privacyPurpose: "送信内容は問い合わせへの対応に使用します。",
        status: { idle: "", invalid: "入力内容を確認してください。最初のエラー項目へ移動しました。", turnstile: "送信前の認証を確認しています。", sending: "送信しています。", success: "送信しました。内容を確認します。", error: "送信できませんでした。入力内容はこの画面に残っています。" },
        fallback: "入力内容を必要に応じてコピーし、固定された同意文を含むメールから再送してください。",
        fallbackAction: "同意文入りのメールを作成する"
      },
      pricing: {
        eyebrow: "Pricing guide",
        title: "クリエイターサイトは、HP-portalの公開プランを基準に確認できます。",
        body: "このサイトには金額を複製しません。最新の内容と適用範囲は、HP-portalのプランページで確認してください。",
        action: "HP-portalのプランを見る",
        href: "https://templates.kuro-lab.com/plans"
      },
      faq: {
        eyebrow: "FAQ",
        title: "送信前によくある確認",
        items: [
          { id: "details", question: "何を書けばよいですか？", answer: "現在の状況、つくりたいもの、困っていることを、分かる範囲で記入してください。" },
          { id: "materials", question: "文章や画像が揃っていなくても相談できますか？", answer: "はい。揃っている情報と、これから決める必要がある内容を分けるところから確認できます。" },
          { id: "non-creators", question: "クリエイター以外の小規模サイトも相談できますか？", answer: "はい。小規模事業サイトやランディングページも、現在の目的と必要な範囲から相談できます。" }
        ]
      }
    }
  },
  en: {
    about: {
      hero: { eyebrow: "About kurodev", titleLines: ["Understand the workflow.", "Shape the right tool or website."], body: "kurodev identifies points of friction in creator preparation, publishing, and inquiry routes, then improves them through practical tools and web production." },
      purpose: { eyebrow: "Purpose", title: "Decide what should become clearer before deciding what to build.", body: "The goal is not to add screens or features for their own sake. The goal is to help creators and their audiences understand the next useful action.", note: "Technology remains a means to that outcome. Public work and the currently supported scope stay the basis for every claim." },
      creatorFocus: { eyebrow: "Creator focus", title: "Treat daily preparation and the public home for the work as one connected flow.", body: "The stream-preparation workflow behind Kuro Stream Kit and the web structure for profiles, work, and inquiries are considered as connected parts of creator activity." },
      process: { eyebrow: "Process", title: "Move from clarification to post-launch improvement through small decisions.", items: [{ id: "clarify", title: "Clarify the goal and current state", body: "Review the activity, intended audience, and routes that currently create friction." }, { id: "structure", title: "Plan information and interaction order", body: "Choose the necessary content and the order visitors or users should follow." }, { id: "build", title: "Implement the surface and behavior", body: "Build for the required viewport range and different ways of interacting." }, { id: "improve", title: "Consider improvements after launch", body: "Review verified issues in small, bounded, and reviewable changes." }] },
      scope: { eyebrow: "Supported scope", title: "Production areas currently introduced", body: "The list stays within published work and the capabilities described by current service pages.", items: ["Creator-focused web tools", "Creator websites for activity information", "Small websites and landing pages", "Post-launch improvements to routes, copy, and maintenance"] },
      flagship: { eyebrow: "Verified work", title: "See the current work through Kuro Stream Kit.", body: "Explore the publication-verified tools for stream schedules, announcement visuals, and social-ready assets, plus the verified scope behind their design and implementation.", actions: [{ id: "case-study", label: "Read the case study", href: "/works/kuro-stream-kit" }, { id: "tools", label: "Explore the public tools", href: "/tools", variant: "secondary" }] }
    },
    contact: {
      intro: { eyebrow: "Contact", titleLines: ["Start a production inquiry", "with what you know today."], body: "Share what you can about a creator website, an existing-site improvement, or a tool or web-service project.", supportLead: "Kuro Stream Kit usage questions and bug reports use a separate feedback route.", supportAction: "Send Kuro Stream Kit feedback" },
      reassurance: { title: "You do not need to decide everything before asking.", items: [{ id: "incomplete", title: "Incomplete scope is welcome", body: "Budget, launch timing, and page count may remain undecided when you send the inquiry." }, { id: "activity-name", title: "Use your activity name", body: "You may use a public activity or studio name instead of a legal name." }, { id: "reply", title: "Reply expectations", body: "The inquiry is reviewed and, when a reply is possible, you will be contacted by email. A reply time is not guaranteed." }, { id: "private", title: "Submitted content is not published", body: "The submitted details are used to respond to the inquiry and are not posted on this site." }, { id: "contract", title: "An inquiry is not a contract", body: "Scope and terms are agreed separately after the inquiry." }] },
      form: { eyebrow: "Inquiry form", title: "Discuss a production project", body: "Complete the required fields and enter at least 20 characters. A reference URL is optional.", required: "Required", optional: "Optional", labels: { name: "Name or activity name", email: "Email address", category: "Inquiry category", referenceUrl: "Reference URL", message: "Inquiry details" }, placeholders: { name: "Activity name or your name", email: "name@example.com", category: "Choose a category", referenceUrl: "https://example.com", message: "Share the current situation, what you want to discuss, and anything already decided." }, messageGuidance: "Enter at least 20 characters.", consentLegend: "Review and consent before sending", turnstile: "Verification could not be completed. Try again.", submit: "Send inquiry", sending: "Sending…", privacyLink: "Open the Privacy Policy", foreignProcessingLink: "Open the notice regarding processing outside Japan", privacyPurpose: "Submitted details are used to respond to your inquiry.", status: { idle: "", invalid: "Review the fields below. Focus moved to the first error.", turnstile: "Checking the verification required before sending.", sending: "Sending your inquiry.", success: "Your inquiry was sent and will be reviewed.", error: "The inquiry could not be sent. Your typed values remain on this page." }, fallback: "Copy your typed details if needed, then resend them using the email containing the fixed consent wording.", fallbackAction: "Create the consent-prefilled email" },
      pricing: { eyebrow: "Pricing guide", title: "Creator website pricing is maintained by HP-portal.", body: "Prices are not copied onto this site. Review the current options and applicable scope on the canonical HP-portal plans page.", action: "View HP-portal plans", href: "https://templates.kuro-lab.com/plans" },
      faq: { eyebrow: "FAQ", title: "Common questions before sending", items: [{ id: "details", question: "What should I include?", answer: "Share the current situation, what you want to make, and what is difficult, using the detail available now." }, { id: "materials", question: "Can I ask before copy and images are ready?", answer: "Yes. We can separate what already exists from the content and decisions that still need attention." }, { id: "non-creators", question: "Can I ask about a small non-creator website?", answer: "Yes. Small-business websites and landing pages can be discussed from the current goal and necessary scope." }] }
    }
  }
};
