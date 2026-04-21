"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  category: "新規制作",
  message: ""
};

export function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = "お名前を入力してください。";
    if (!values.email.includes("@")) nextErrors.email = "メールアドレスの形式を確認してください。";
    if (values.message.trim().length < 20) nextErrors.message = "相談内容は20文字以上で入力してください。";

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
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

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-[var(--text-soft)]">
          内容を整理して、相談前に必要な情報を確認できます。
        </p>
        <button type="submit" className="button-primary border-0">
          相談内容を確認する
        </button>
      </div>

      {submitted ? (
        <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
          入力内容は確認できました。正式な送信窓口は公開準備中です。
        </div>
      ) : null}
    </form>
  );
}
