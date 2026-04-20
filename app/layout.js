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
  title: "kurodev Portal Site",
  description: "ポートフォリオと HP-portal、今後のツール窓口を一つにまとめる portal site."
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
