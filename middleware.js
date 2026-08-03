import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  buildStaticHomeDocument,
  buildStaticGuideDocument,
  buildStaticCreatorSiteDocument,
  buildStaticContactDocument,
  buildStaticToolsDocument,
  isStaticGuideRequest,
  isStaticHomeRequest,
  isStaticCreatorSiteRequest,
  isStaticContactRequest,
  isStaticToolsRequest,
  fetchStaticSourceResponse
} from "@/lib/static-guide-document.mjs";

export async function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname === "/en" || request.nextUrl.pathname.startsWith("/en/") ? "en" : "ja";
  requestHeaders.set("x-kurodev-locale", locale);

  const staticGuide = isStaticGuideRequest(request.nextUrl, request.method);
  const staticHome = isStaticHomeRequest(request.nextUrl, request.method);
  const staticTools = isStaticToolsRequest(request.nextUrl, request.method);
  const staticCreatorSite = isStaticCreatorSiteRequest(request.nextUrl, request.method);
  const staticContact = isStaticContactRequest(request.nextUrl, request.method);

  if (staticGuide || staticHome || staticTools || staticCreatorSite || staticContact) {
    let selfBinding;
    try {
      selfBinding = getCloudflareContext().env.WORKER_SELF_REFERENCE;
    } catch {
      selfBinding = undefined;
    }
    const sourceResponse = await fetchStaticSourceResponse(selfBinding, request.nextUrl, locale);
    if (!sourceResponse.ok) return sourceResponse;

    const responseHeaders = new Headers(sourceResponse.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("set-cookie");
    responseHeaders.delete("transfer-encoding");
    responseHeaders.set("content-type", "text/html; charset=utf-8");
    responseHeaders.set(
      "x-kurodev-rendering",
      staticGuide
        ? "static-guide-islands"
        : staticHome
          ? "static-home-islands"
          : staticTools
            ? "static-tools-islands"
            : staticCreatorSite
              ? "static-creator-site-islands"
              : "static-contact-islands"
    );
    const sourceDocument = await sourceResponse.text();
    const staticDocument = staticGuide
      ? buildStaticGuideDocument(sourceDocument)
      : staticHome
        ? buildStaticHomeDocument(sourceDocument)
        : staticTools
          ? buildStaticToolsDocument(sourceDocument)
          : staticCreatorSite
            ? buildStaticCreatorSiteDocument(sourceDocument)
            : buildStaticContactDocument(sourceDocument, locale);
    return new Response(staticDocument, {
      status: sourceResponse.status,
      headers: responseHeaders
    });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png|brand-icon.png|images).*)"]
};
