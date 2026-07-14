"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import {
  CONTACT_CATEGORIES,
  firstInvalidContactField,
  validateContactInput
} from "@/lib/contact-validation.mjs";

const initialState = {
  name: "",
  email: "",
  category: "",
  referenceUrl: "",
  message: ""
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function resetTurnstile() {
  if (typeof window !== "undefined" && window.turnstile) window.turnstile.reset();
}

function describedBy(field, errors, guidanceId) {
  return [guidanceId, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function ContactForm({ locale, copy }) {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});
  const turnstileRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContactInput(values, locale);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      const firstField = firstInvalidContactField(nextErrors);
      requestAnimationFrame(() => fieldRefs.current[firstField]?.focus());
      return;
    }

    const formData = new FormData(event.currentTarget);
    const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
    if (turnstileSiteKey && !turnstileToken) {
      setErrors({ turnstile: copy.turnstile });
      setStatus("turnstile");
      requestAnimationFrame(() => turnstileRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken })
      });

      if (!response.ok) {
        setStatus("error");
        resetTurnstile();
        return;
      }

      setValues(initialState);
      setErrors({});
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
      <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
        <div className="contact-form__field-grid">
          <div className="contact-form__field">
            <label htmlFor="contact-name">{copy.labels.name}<span>{copy.required}</span></label>
            <input ref={(node) => { fieldRefs.current.name = node; }} id="contact-name" name="name" value={values.name} onChange={handleChange} placeholder={copy.placeholders.name} autoComplete="name" required maxLength={80} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name", errors)} />
            {errors.name ? <p id="name-error" className="contact-form__error">{errors.name}</p> : null}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-email">{copy.labels.email}<span>{copy.required}</span></label>
            <input ref={(node) => { fieldRefs.current.email = node; }} id="contact-email" name="email" type="email" value={values.email} onChange={handleChange} placeholder={copy.placeholders.email} autoComplete="email" required maxLength={120} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email", errors)} />
            {errors.email ? <p id="email-error" className="contact-form__error">{errors.email}</p> : null}
          </div>
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-category">{copy.labels.category}<span>{copy.required}</span></label>
          <select ref={(node) => { fieldRefs.current.category = node; }} id="contact-category" name="category" value={values.category} onChange={handleChange} required aria-invalid={Boolean(errors.category)} aria-describedby={describedBy("category", errors)}>
            <option value="" disabled>{copy.placeholders.category}</option>
            {CONTACT_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label[locale]}</option>)}
          </select>
          {errors.category ? <p id="category-error" className="contact-form__error">{errors.category}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-reference-url">{copy.labels.referenceUrl}<span className="contact-form__optional">{copy.optional}</span></label>
          <input ref={(node) => { fieldRefs.current.referenceUrl = node; }} id="contact-reference-url" name="referenceUrl" type="url" value={values.referenceUrl} onChange={handleChange} placeholder={copy.placeholders.referenceUrl} maxLength={300} aria-invalid={Boolean(errors.referenceUrl)} aria-describedby={describedBy("referenceUrl", errors)} />
          {errors.referenceUrl ? <p id="referenceUrl-error" className="contact-form__error">{errors.referenceUrl}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-message">{copy.labels.message}<span>{copy.required}</span></label>
          <p id="message-guidance" className="contact-form__guidance">{copy.messageGuidance}</p>
          <textarea ref={(node) => { fieldRefs.current.message = node; }} id="contact-message" name="message" value={values.message} onChange={handleChange} placeholder={copy.placeholders.message} rows={7} required maxLength={3000} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message", errors, "message-guidance")} />
          {errors.message ? <p id="message-error" className="contact-form__error">{errors.message}</p> : null}
        </div>

        {turnstileSiteKey ? (
          <div ref={turnstileRef} className="contact-form__turnstile" tabIndex={-1} aria-invalid={Boolean(errors.turnstile)} aria-describedby={errors.turnstile ? "turnstile-error" : undefined}>
            <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" />
            {errors.turnstile ? <p id="turnstile-error" className="contact-form__error">{errors.turnstile}</p> : null}
          </div>
        ) : null}

        <div className="contact-form__actions">
          <div className="contact-form__privacy">
            <span className="contact-form__privacy-unavailable" role="link" aria-disabled="true">{copy.privacyUnavailable}</span>
            <small>{copy.privacyPurpose}</small>
          </div>
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}</button>
        </div>

        <div className={`contact-form__status contact-form__status--${status}`} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} aria-atomic="true">
          {copy.status[status]}
          {status === "error" ? <p className="contact-form__fallback">{copy.fallback} <a href="mailto:contact@kuro-lab.com">contact@kuro-lab.com</a></p> : null}
        </div>
      </form>
    </>
  );
}
