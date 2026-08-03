"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function EnglishSuggestion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem("kurodev-english-suggestion-dismissed") === "1";
    const storedLocale = window.localStorage.getItem("kurodev-locale");
    const browserPrefersEnglish = window.navigator.language.toLowerCase().startsWith("en");
    setVisible(!dismissed && (storedLocale === "en" || (!storedLocale && browserPrefersEnglish)));
  }, []);

  if (!visible) return null;

  return (
    <aside className="english-suggestion" aria-label="English language suggestion">
      <p>English version is available.</p>
      <Link href="/en" lang="en" onClick={() => window.localStorage.setItem("kurodev-locale", "en")}>View in English</Link>
      <button type="button" onClick={() => {
        window.sessionStorage.setItem("kurodev-english-suggestion-dismissed", "1");
        setVisible(false);
      }}>Close</button>
    </aside>
  );
}
