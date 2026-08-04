function isApiRequest(request) {
  return new URL(request.url).pathname === "/api" || new URL(request.url).pathname.startsWith("/api/");
}

export function createStaticFirstFetch({ openNextFetch, assetsFetch }) {
  if (typeof openNextFetch !== "function" || typeof assetsFetch !== "function") {
    throw new TypeError("Static-first entry requires OpenNext and ASSETS fetch handlers");
  }
  return async function staticFirstFetch(request) {
    return isApiRequest(request) ? openNextFetch(request) : assetsFetch(request);
  };
}

async function getOpenNextFetch() {
  const generatedWorker = await import("../.open-next/worker.js");
  const handler = generatedWorker.default?.fetch ?? generatedWorker.fetch;
  if (typeof handler !== "function") throw new TypeError("Generated OpenNext worker has no fetch handler");
  return handler;
}

export default {
  async fetch(request, env, context) {
    if (!isApiRequest(request)) return env.ASSETS.fetch(request);
    const openNextFetch = await getOpenNextFetch();
    return openNextFetch(request, env, context);
  }
};
