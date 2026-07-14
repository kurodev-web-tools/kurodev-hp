import "./globals.css";
import "./styles/shell.css";
import "./styles/components.css";
import "./styles/home-hero.css";
import "./styles/home-sections.css";
import "./styles/tools-page.css";
import "./styles/creator-site.css";
import "./styles/works-page.css";
import "./styles/guide-page.css";
import Script from "next/script";
import { headers } from "next/headers";
import { SiteShell } from "@/components/site-shell";

const themeInitScript = `
  (function () {
    try {
      var saved = window.localStorage.getItem('kurodev-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export const metadata = {
  metadataBase: new URL("https://kuro-lab.com"),
  title: "kurodev | Web制作・改善運用・業務ツール相談",
  description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。",
  openGraph: {
    title: "kurodev | Web制作・改善運用・業務ツール相談",
    description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。",
    url: "https://kuro-lab.com",
    siteName: "kurodev",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "kurodev portal & build desk"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "kurodev | Web制作・改善運用・業務ツール相談",
    description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。",
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }) {
  const locale = headers().get("x-kurodev-locale") === "en" ? "en" : "ja";
  const enableReactDevTools =
    process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS !== "1";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {enableReactDevTools ? (
          <>
            <Script src="//unpkg.com/react-grab/dist/index.global.js" crossOrigin="anonymous" strategy="beforeInteractive" />
            <Script src="//unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" strategy="beforeInteractive" />
          </>
        ) : null}
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a className="skip-link" href="#main-content">{locale === "ja" ? "本文へ移動" : "Skip to main content"}</a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
