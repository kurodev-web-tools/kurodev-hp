"use client";

import Link from "next/link";
import Script from "next/script";
import { useRef, useState } from "react";
import {
  CONTACT_CONSENT_REGISTRY,
  buildDirectEmailHref,
  contactConsentErrors,
  currentContactConsentSubmission
} from "@/lib/contact-consent.mjs";
import {
  CONTACT_CATEGORIES,
  firstInvalidContactField,
  validateContactInput
} from "@/lib/contact-validation.mjs";
import { localePath } from "@/lib/i18n.mjs";

const initialState = {
  name: "",
  email: "",
  category: "",
  referenceUrl: "",
  message: "",
  privacyAcknowledged: false,
  foreignTransferConsent: false
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function describedBy(field, errors, guidanceId) {
  return [guidanceId, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function ContactForm({ locale, copy }) {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const tokenResolveRef = useRef(null);
  const tokenRejectRef = useRef(null);
  const consent = CONTACT_CONSENT_REGISTRY[locale];
  const isSubmitting = status === "turnstile" || status === "sending";

  function clearPendingTurnstile(error) {
    if (error) tokenRejectRef.current?.(error);
    tokenResolveRef.current = null;
    tokenRejectRef.current = null;
  }

  function removeTurnstile() {
    clearPendingTurnstile(new Error("Turnstile consent was withdrawn."));
    if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = null;
  }

  function resetTurnstile() {
    clearPendingTurnstile();
    if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  function renderTurnstile() {
    if (!window.turnstile || !turnstileRef.current || widgetIdRef.current !== null) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      execution: "execute",
      appearance: "execute",
      callback(token) {
        tokenResolveRef.current?.(token);
        clearPendingTurnstile();
      },
      "error-callback"() {
        clearPendingTurnstile(new Error("Turnstile verification failed."));
      },
      "expired-callback"() {
        resetTurnstile();
      }
    });
  }

  function executeTurnstile() {
    if (!turnstileSiteKey) return Promise.resolve("");
    if (!window.turnstile || widgetIdRef.current === null) {
      return Promise.reject(new Error("Turnstile is not ready."));
    }
    return new Promise((resolve, reject) => {
      tokenResolveRef.current = resolve;
      tokenRejectRef.current = reject;
      window.turnstile.execute(widgetIdRef.current);
    });
  }

  function handleChange(event) {
    const { checked, name, type, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    if (name === "foreignTransferConsent" && nextValue === false) removeTurnstile();
    setValues((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {
      ...validateContactInput(values, locale),
      ...contactConsentErrors(values, locale)
    };
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      const firstField = firstInvalidContactField(nextErrors);
      requestAnimationFrame(() => fieldRefs.current[firstField]?.focus());
      return;
    }

    let turnstileToken = "";
    try {
      if (turnstileSiteKey) {
        setStatus("turnstile");
        turnstileToken = await executeTurnstile();
      }
      setStatus("sending");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...currentContactConsentSubmission(locale),
          turnstileToken
        })
      });

      if (!response.ok) {
        setStatus("error");
        resetTurnstile();
        return;
      }

      removeTurnstile();
      setValues(initialState);
      setErrors({});
      setStatus("success");
    } catch {
      setErrors((current) => ({ ...current, turnstile: copy.turnstile }));
      setStatus("error");
      resetTurnstile();
    }
  }

  return (
    <>
      {turnstileSiteKey && values.foreignTransferConsent ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      ) : null}
      <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
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

        <fieldset className="contact-form__consents">
          <legend>{copy.consentLegend}</legend>
          <div className="contact-form__consent">
            <label htmlFor="contact-privacy-acknowledged">
              <input
                ref={(node) => { fieldRefs.current.privacyAcknowledged = node; }}
                id="contact-privacy-acknowledged"
                name="privacyAcknowledged"
                type="checkbox"
                checked={values.privacyAcknowledged}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.privacyAcknowledged)}
                aria-describedby={describedBy("privacyAcknowledged", errors)}
              />
              <span>{consent.privacy.copy}</span>
            </label>
            <div className="contact-form__consent-links">
              <Link href={localePath(locale, "/privacy")} prefetch={false}>{copy.privacyLink}</Link>
            </div>
            {errors.privacyAcknowledged ? <p id="privacyAcknowledged-error" className="contact-form__error">{errors.privacyAcknowledged}</p> : null}
          </div>

          <div className="contact-form__consent">
            <label htmlFor="contact-foreign-transfer-consent">
              <input
                ref={(node) => { fieldRefs.current.foreignTransferConsent = node; }}
                id="contact-foreign-transfer-consent"
                name="foreignTransferConsent"
                type="checkbox"
                checked={values.foreignTransferConsent}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.foreignTransferConsent)}
                aria-describedby={describedBy("foreignTransferConsent", errors)}
              />
              <span>{consent.foreign.copy}</span>
            </label>
            <div className="contact-form__consent-links">
              <Link href={localePath(locale, "/privacy")} prefetch={false}>{copy.privacyLink}</Link>
              <Link href={localePath(locale, "/privacy/foreign-processing")} prefetch={false}>{copy.foreignProcessingLink}</Link>
            </div>
            {errors.foreignTransferConsent ? <p id="foreignTransferConsent-error" className="contact-form__error">{errors.foreignTransferConsent}</p> : null}
          </div>
        </fieldset>

        {turnstileSiteKey && values.foreignTransferConsent ? (
          <div ref={turnstileRef} className="contact-form__turnstile" tabIndex={-1} aria-invalid={Boolean(errors.turnstile)} aria-describedby={errors.turnstile ? "turnstile-error" : undefined}>
            {errors.turnstile ? <p id="turnstile-error" className="contact-form__error">{errors.turnstile}</p> : null}
          </div>
        ) : null}

        <div className="contact-form__actions">
          <small>{copy.privacyPurpose}</small>
          <button type="submit" disabled={isSubmitting}>{status === "sending" ? copy.sending : copy.submit}</button>
        </div>

        <div className={`contact-form__status contact-form__status--${status}`} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} aria-atomic="true">
          {copy.status[status]}
          {status === "error" ? <p className="contact-form__fallback">{copy.fallback} <a href={buildDirectEmailHref(locale)}>{copy.fallbackAction}</a></p> : null}
        </div>
      </form>
    </>
  );
}
