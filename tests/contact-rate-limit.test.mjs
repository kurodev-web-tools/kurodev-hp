import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const rateLimitUrl = pathToFileURL(`${repositoryRoot}/lib/contact-rate-limit.mjs`).href;

async function loadRateLimitModule() {
  try {
    return await import(rateLimitUrl);
  } catch {
    return {};
  }
}

test("Contact rate limiting uses one fixed privacy-safe key", async () => {
  const { checkContactRateLimit } = await loadRateLimitModule();
  assert.equal(typeof checkContactRateLimit, "function");

  const keys = [];
  const result = await checkContactRateLimit({
    limiter: {
      async limit(input) {
        keys.push(input);
        return { success: true };
      }
    }
  });

  assert.deepEqual(result, { ok: true });
  assert.deepEqual(keys, [{ key: "contact-submit" }]);
});

test("Contact rate limiting returns a generic 429 and samples a fixed code only", async () => {
  const { checkContactRateLimit } = await loadRateLimitModule();
  assert.equal(typeof checkContactRateLimit, "function");

  const events = [];
  const result = await checkContactRateLimit({
    limiter: { limit: async () => ({ success: false }) },
    random: () => 0.009,
    logEvent: (code) => events.push(code)
  });

  assert.deepEqual(result, { ok: false, status: 429, error: "RATE_LIMITED" });
  assert.deepEqual(events, ["RATE_LIMITED"]);
});

test("Contact rate-limit denial logs are omitted outside the one-percent sample", async () => {
  const { checkContactRateLimit } = await loadRateLimitModule();
  assert.equal(typeof checkContactRateLimit, "function");

  const events = [];
  const result = await checkContactRateLimit({
    limiter: { limit: async () => ({ success: false }) },
    random: () => 0.01,
    logEvent: (code) => events.push(code)
  });

  assert.deepEqual(result, { ok: false, status: 429, error: "RATE_LIMITED" });
  assert.deepEqual(events, []);
});

test("Missing or failed rate-limit bindings fail closed before providers", async () => {
  const { checkContactRateLimit } = await loadRateLimitModule();
  assert.equal(typeof checkContactRateLimit, "function");

  for (const limiter of [undefined, { limit: async () => { throw new Error("binding unavailable"); } }]) {
    const events = [];
    const result = await checkContactRateLimit({
      limiter,
      logEvent: (code) => events.push(code)
    });

    assert.deepEqual(result, { ok: false, status: 503, error: "RATE_LIMIT_UNAVAILABLE" });
    assert.deepEqual(events, ["RATE_LIMIT_UNAVAILABLE"]);
  }
});
