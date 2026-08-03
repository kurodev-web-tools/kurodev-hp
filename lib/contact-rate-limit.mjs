const CONTACT_RATE_LIMIT_KEY = "contact-submit";
const RATE_LIMIT_LOG_SAMPLE = 0.01;

function unavailable(logEvent) {
  logEvent("RATE_LIMIT_UNAVAILABLE");
  return { ok: false, status: 503, error: "RATE_LIMIT_UNAVAILABLE" };
}

export async function checkContactRateLimit({
  limiter,
  random = Math.random,
  logEvent = () => {}
} = {}) {
  if (!limiter || typeof limiter.limit !== "function") {
    return unavailable(logEvent);
  }

  let result;

  try {
    result = await limiter.limit({ key: CONTACT_RATE_LIMIT_KEY });
  } catch {
    return unavailable(logEvent);
  }

  if (result?.success !== true) {
    if (random() < RATE_LIMIT_LOG_SAMPLE) {
      logEvent("RATE_LIMITED");
    }

    return { ok: false, status: 429, error: "RATE_LIMITED" };
  }

  return { ok: true };
}
