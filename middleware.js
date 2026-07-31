import { NextResponse } from "next/server";
import {
  buildStaticGuideDocument,
  isStaticGuideRequest,
  staticGuideSourceUrl
} from "@/lib/static-guide-document.mjs";

export async function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname === "/en" || request.nextUrl.pathname.startsWith("/en/") ? "en" : "ja";
  requestHeaders.set("x-kurodev-locale", locale);

  if (isStaticGuideRequest(request.nextUrl)) {
    const sourceResponse = await fetch(staticGuideSourceUrl(request.nextUrl), {
      headers: requestHeaders
    });
    if (!sourceResponse.ok) return sourceResponse;

    const responseHeaders = new Headers(sourceResponse.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.set("content-type", "text/html; charset=utf-8");
    responseHeaders.set("x-kurodev-rendering", "static-guide-islands");
    return new Response(buildStaticGuideDocument(await sourceResponse.text()), {
      status: sourceResponse.status,
      headers: responseHeaders
    });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png|brand-icon.png|images).*)"]
};
