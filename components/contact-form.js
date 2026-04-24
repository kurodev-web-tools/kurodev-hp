"use client";

import Script from "next/script";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  category: "新規制作",
  referenceUrl: "",
  message: ""
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function resetTurnstile() {
  if (typeof window !== "undefined" && window.turnstile) {
    window.turnstile.reset();
  }
}

export function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = "お名前を入力してください。";
    if (!values.email.includes("@")) nextErrors.email = "メールアドレスの形式を確認してください。";
    if (values.referenceUrl.trim()) {
      try {
        const url = new URL(values.referenceUrl);
        if (!["http:", "https:"].includes(url.protocol)) nextErrors.referenceUrl = "URLは http または https で入力してください。";
      } catch {
        nextErrors.referenceUrl = "参考URLの形式を確認してください。";
      }
    }
    if (values.message.trim().length < 20) nextErrors.message = "相談内容は20文字以上で入力してください。";

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setStatus("idle");

    if (Object.keys(nextErrors).length > 0) return;

    const formData = new FormData(event.currentTarget);
    const turnstileToken = String(formData.get("cf-turnstile-response") || "");

    if (turnstileSiteKey && !turnstileToken) {
      setErrors({ turnstile: "認証を完了してから送信してください。" });
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken
        })
      });

      if (!response.ok) {
        setStatus("error");
        resetTurnstile();
        return;
      }

      setValues(initialState);
      setStatus("success");
      resetTurnstile();
    } catch {
      setStatus("error");
      resetTurnstile();
    }
  }

  return (
    <>
      {turnstileSiteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer /> : null}
      <form onSubmit={handleSubmit} className="bento-card">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--text)]">お名前</span>
            <input name="name" value={values.name} onChange={handleChange} placeholder="kuroe" className="input-shell" />
            {errors.name ? <p className="text-sm text-rose-500">{errors.name}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--text)]">メールアドレス</span>
            <input name="email" value={values.email} onChange={handleChange} placeholder="name@example.com" className="input-shell" />
            {errors.email ? <p className="text-sm text-rose-500">{errors.email}</p> : null}
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-[var(--text)]">相談カテゴリ</span>
          <select name="category" value={values.category} onChange={handleChange} className="input-shell">
            <option>新規制作</option>
            <option>既存サイト改善</option>
            <option>業務ツール相談</option>
            <option>運用整理</option>
          </select>
        </label>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-[var(--text)]">参考URL</span>
          <input
            name="referenceUrl"
            value={values.referenceUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="input-shell"
          />
          {errors.referenceUrl ? <p className="text-sm text-rose-500">{errors.referenceUrl}</p> : null}
        </label>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-[var(--text)]">相談内容</span>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="現状、相談したいこと、急ぎ度が分かる範囲で大丈夫です。"
            rows={6}
            className="input-shell resize-none"
          />
          {errors.message ? <p className="text-sm text-rose-500">{errors.message}</p> : null}
        </label>

        {turnstileSiteKey ? (
          <div className="mt-5">
            <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" />
            {errors.turnstile ? <p className="mt-2 text-sm text-rose-500">{errors.turnstile}</p> : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-[var(--text-soft)]">
            <span className="block">細部が未定でも、分かる範囲で送信できます。</span>
            <span className="block">確認後、整理が必要な点を含めてメールで返信します。</span>
          </p>
          <button type="submit" className="button-primary border-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={status === "sending"}>
            {status === "sending" ? "送信中..." : "送信する"}
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
            送信しました。内容を確認して返信します。
          </div>
        ) : null}

        {status === "error" ? (
          <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">
            送信に失敗しました。時間を置いて再度お試しください。
          </div>
        ) : null}
      </form>
    </>
  );
}
