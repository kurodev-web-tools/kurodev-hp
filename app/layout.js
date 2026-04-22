import "./globals.css";
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
  alternates: {
    canonical: "/"
  },
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
    icon: "/icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
