import { createServer } from "node:net";
import { cp, lstat, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";
import { getLocaleForPublicPath, getPublicRouteInventory, SITE_URL } from "../lib/public-route-inventory.mjs";
import { transformStaticDocument } from "../lib/static-guide-document.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(root, ".open-next");
const recoveryDirectory = join(root, ".open-next-recovery");
const candidateDirectory = join(root, ".open-next-candidate");
const candidateAssetsDirectory = join(candidateDirectory, "assets");
const npmCli = join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const localFetchTimeoutMs = 15_000;
const transientRenameErrors = new Set(["EPERM", "EBUSY"]);
const turnstileSiteKeyPattern = /^0x[0-9A-Za-z_-]{20,128}$/;
const securityHeaders = [
  ["Strict-Transport-Security", "max-age=15552000"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()"]
];
const redirects = [
  ["/tool", "/tools"],
  ["/web", "/works"],
  ["/profile", "/about"]
];

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function fetchLocal(url, options, consumeResponse) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), localFetchTimeoutMs);
  try {
    return await consumeResponse(await fetch(url, { ...options, signal: controller.signal }));
  } finally {
    clearTimeout(timeout);
  }
}

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit", windowsHide: true });
    child.once("error", rejectRun);
    child.once("exit", (code, signal) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`Build command failed (${signal ?? code ?? "unknown"})`));
    });
  });
}

function startLocalServer(port) {
  const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextCli, "start", "-p", String(port)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output = `${output}${chunk}`.slice(-4000); });
  child.stderr.on("data", (chunk) => { output = `${output}${chunk}`.slice(-4000); });
  return { child, getOutput: () => output };
}

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  await new Promise((resolveClose, rejectClose) => server.close((error) => error ? rejectClose(error) : resolveClose()));
  if (!address || typeof address === "string") throw new Error("Unable to allocate isolated local port");
  return address.port;
}

async function waitForServer(origin, processHandle) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (processHandle.child.exitCode !== null) throw new Error("Local server stopped before it became ready");
    try {
      const response = await fetchLocal(`${origin}/`, { method: "GET", headers: { "x-kurodev-locale": "ja" } }, (readyResponse) => readyResponse);
      if (response.status > 0) return;
    } catch {}
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Local server did not start cleanly: ${processHandle.getOutput()}`);
}

function waitForChildExit(child, timeoutMs) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve(true);
  return new Promise((resolveExit) => {
    const timeout = setTimeout(() => finish(false), timeoutMs);
    const onExit = () => finish(true);
    function finish(exited) {
      clearTimeout(timeout);
      child.off("exit", onExit);
      resolveExit(exited || child.exitCode !== null || child.signalCode !== null);
    }
    child.once("exit", onExit);
  });
}

async function terminateLocalServer(processHandle) {
  const { child } = processHandle;
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  if (await waitForChildExit(child, 5000)) return;
  child.kill("SIGKILL");
  if (await waitForChildExit(child, 5000)) return;
  throw new Error("Local server could not be confirmed stopped");
}

function routeAssetPath(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
}

async function writeCandidateFile(relativePath, content) {
  const destination = join(candidateAssetsDirectory, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

function assertHtmlResponse(response, route) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.toLowerCase().startsWith("text/html")) {
    throw new Error(`Snapshot failed for ${route}`);
  }
}

async function snapshotDocument(origin, route, turnstileSiteKey) {
  const locale = getLocaleForPublicPath(route);
  return fetchLocal(new URL(route, origin), {
    method: "GET",
    headers: { accept: "text/html", "x-kurodev-locale": locale }
  }, async (response) => {
    assertHtmlResponse(response, route);
    return transformStaticDocument(await response.text(), { route, locale, turnstileSiteKey });
  });
}

async function snapshotControlFile(origin, route, relativePath, expectedContentType) {
  await fetchLocal(new URL(route, origin), { method: "GET" }, async (response) => {
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.toLowerCase().startsWith(expectedContentType)) {
      throw new Error(`Control asset failed validation for ${route}`);
    }
    await writeCandidateFile(relativePath, Buffer.from(await response.arrayBuffer()));
  });
}

function headersFile() {
  return `/*\n${securityHeaders.map(([name, value]) => `  ${name}: ${value}`).join("\n")}\n/opengraph-image\n  Content-Type: image/png\n`;
}

function redirectsFile() {
  return `${redirects.map(([source, destination]) => `${source} ${destination} 308`).join("\n")}\n`;
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  }));
  return nested.flat();
}

function candidatePathForReference(reference) {
  const pathname = new URL(reference, "https://static.local").pathname;
  if (pathname === "/") return join(candidateAssetsDirectory, "index.html");
  if (extname(pathname)) return join(candidateAssetsDirectory, pathname.slice(1));
  return join(candidateAssetsDirectory, routeAssetPath(pathname));
}

async function validateLocalReferences() {
  const htmlFiles = (await listFiles(candidateAssetsDirectory)).filter((file) => file.endsWith(".html"));
  for (const htmlFile of htmlFiles) {
    const document = await readFile(htmlFile, "utf8");
    for (const match of document.matchAll(/\s(?:src|href)=(['"])(.*?)\1/gi)) {
      const reference = match[2];
      if (!reference.startsWith("/") || reference.startsWith("//") || reference.startsWith("/api/")) continue;
      const target = candidatePathForReference(reference);
      if (!await exists(target)) throw new Error(`Missing local asset ${reference} referenced by ${relative(candidateAssetsDirectory, htmlFile)}`);
    }
    for (const match of document.matchAll(/\ssrcset=(['"])(.*?)\1/gi)) {
      for (const candidate of match[2].split(",")) {
        const reference = candidate.trim().split(/\s+/)[0];
        if (!reference?.startsWith("/") || reference.startsWith("//")) continue;
        const target = candidatePathForReference(reference);
        if (!await exists(target)) throw new Error(`Missing local srcset asset ${reference} referenced by ${relative(candidateAssetsDirectory, htmlFile)}`);
      }
    }
  }
}

async function validateCandidate(routes) {
  for (const route of routes) {
    const file = join(candidateAssetsDirectory, routeAssetPath(route.path));
    const document = await readFile(file, "utf8");
    if (!/<html\b[^>]*\blang=/i.test(document) || !/<title>[^<]+<\/title>/i.test(document) || !/<meta\b[^>]*name=["']description["']/i.test(document) || !/<link\b[^>]*rel=["']canonical["']/i.test(document) || !/<main\b/i.test(document) || !/<h1\b/i.test(document)) {
      throw new Error(`Static document metadata or landmarks missing for ${route.path}`);
    }
    if (/_next\/static\/chunks|self\.__next_f|as=["']script["']/i.test(document) || !/data-kurodev-island/.test(document)) {
      throw new Error(`Static document runtime boundary failed for ${route.path}`);
    }
    if (route.kind === "guide" && !/data-kurodev-guide-island/.test(document)) throw new Error(`Guide island missing for ${route.path}`);
    if (route.path === "/contact" || route.path === "/en/contact") {
      if (!/data-kurodev-contact-island/.test(document)) throw new Error(`Contact island missing for ${route.path}`);
    }
  }
  for (const required of ["404.html", "robots.txt", "sitemap.xml", "_headers", "_redirects"]) {
    if (!await exists(join(candidateAssetsDirectory, required))) throw new Error(`Missing generated control asset: ${required}`);
  }
  const [headers, redirectRules, notFound] = await Promise.all([
    readFile(join(candidateAssetsDirectory, "_headers"), "utf8"),
    readFile(join(candidateAssetsDirectory, "_redirects"), "utf8"),
    readFile(join(candidateAssetsDirectory, "404.html"), "utf8")
  ]);
  if (!headers.includes("Content-Type: image/png") || !securityHeaders.every(([name, value]) => headers.includes(`${name}: ${value}`))) {
    throw new Error("Generated headers disagree with the approved security and Open Graph contract");
  }
  if (!redirects.every(([source, destination]) => redirectRules.includes(`${source} ${destination} 308`))) throw new Error("Generated redirects disagree with Next configuration");
  if (!/<main\b/i.test(notFound) || !/<h1\b/i.test(notFound)) throw new Error("Generated 404 document lacks public landmarks");
  const sitemap = await readFile(join(candidateAssetsDirectory, "sitemap.xml"), "utf8");
  const sitemapLocationList = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, location]) => location);
  const sitemapLocations = new Set(sitemapLocationList);
  const expectedLocations = new Set(routes.filter((route) => route.indexable !== false).map((route) => `${SITE_URL}${route.path}`));
  if (sitemapLocationList.length !== sitemapLocations.size || sitemapLocations.size !== expectedLocations.size || [...expectedLocations].some((location) => !sitemapLocations.has(location))) {
    throw new Error("Sitemap URLs do not exactly match the public route inventory");
  }
  await validateLocalReferences();
}

async function restorePreviousOutput() {
  await rm(outputDirectory, { recursive: true, force: true });
  if (await exists(recoveryDirectory)) await rename(recoveryDirectory, outputDirectory);
}

export async function restoreStartupOutputState(outputPath = outputDirectory, recoveryPath = recoveryDirectory) {
  const [outputExists, recoveryExists] = await Promise.all([exists(outputPath), exists(recoveryPath)]);
  if (outputExists && recoveryExists) throw new Error("Ambiguous static build state: output and recovery both exist");
  if (!outputExists && recoveryExists) await rename(recoveryPath, outputPath);
}

async function renameWithRetry(source, destination) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      await rename(source, destination);
      return;
    } catch (error) {
      if (!transientRenameErrors.has(error?.code) || attempt === 5) throw error;
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 100 * attempt));
    }
  }
}

export async function buildStaticFirstCloudflare() {
  await restoreStartupOutputState();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  if (!turnstileSiteKeyPattern.test(turnstileSiteKey)) throw new Error("Turnstile site key is required for Contact document generation");
  if (await exists(candidateDirectory)) await rm(candidateDirectory, { recursive: true, force: true });
  const previousOutputExists = await exists(outputDirectory);
  if (previousOutputExists) await rename(outputDirectory, recoveryDirectory);
  let localServer;
  try {
    await run(
      process.platform === "win32" ? process.execPath : "npm",
      process.platform === "win32" ? [npmCli, "run", "build:cloudflare"] : ["run", "build:cloudflare"]
    );
    if (!await exists(join(outputDirectory, "assets"))) throw new Error("OpenNext build produced no complete asset directory");
    await cp(outputDirectory, candidateDirectory, { recursive: true, errorOnExist: true });
    const port = await getAvailablePort();
    const origin = `http://127.0.0.1:${port}`;
    localServer = startLocalServer(port);
    await waitForServer(origin, localServer);
    const routes = await getPublicRouteInventory();
    for (const route of routes) await writeCandidateFile(routeAssetPath(route.path), await snapshotDocument(origin, route.path, turnstileSiteKey));
    const notFoundDocument = await fetchLocal(new URL("/__kurodev-static-not-found", origin), { method: "GET", headers: { "x-kurodev-locale": "ja" } }, async (response) => {
      if (response.status !== 404) throw new Error("Local server did not return the expected 404 document");
      return transformStaticDocument(await response.text(), { route: "/not-found", locale: "ja", turnstileSiteKey });
    });
    await writeCandidateFile("404.html", notFoundDocument);
    await snapshotControlFile(origin, "/robots.txt", "robots.txt", "text/plain");
    await snapshotControlFile(origin, "/sitemap.xml", "sitemap.xml", "application/xml");
    await snapshotControlFile(origin, "/opengraph-image", "opengraph-image", "image/png");
    await writeCandidateFile("_headers", headersFile());
    await writeCandidateFile("_redirects", redirectsFile());
    await terminateLocalServer(localServer);
    localServer = undefined;
    await validateCandidate(routes);
    await rm(outputDirectory, { recursive: true, force: true });
    await renameWithRetry(candidateDirectory, outputDirectory);
    if (previousOutputExists) await rm(recoveryDirectory, { recursive: true, force: true });
  } catch (error) {
    await rm(candidateDirectory, { recursive: true, force: true });
    await restorePreviousOutput();
    throw error;
  } finally {
    if (localServer) await terminateLocalServer(localServer);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildStaticFirstCloudflare().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
