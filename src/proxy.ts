import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes, auth callback, and standalone landing pages: skip all middlewares
  if (pathname.startsWith("/api") || pathname.startsWith("/auth") || pathname.startsWith("/lp")) {
    return NextResponse.next();
  }

  // Run i18n middleware first (handles locale detection, / → /en redirect, etc.)
  const i18nResponse = handleI18n(request);

  // If i18n wants to redirect (e.g., / → /en), return immediately
  if (i18nResponse.status !== 200) {
    return i18nResponse;
  }

  // Extract locale from pathname (always present after i18n handled the request)
  const localeMatch = pathname.match(/^\/(en|de)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const pathWithoutLocale = pathname.replace(/^\/(en|de)/, "") || "/";

  // Supabase auth check — build on top of the i18n response
  let supabaseResponse = i18nResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Create a fresh response preserving i18n headers
          supabaseResponse = NextResponse.next({ request });
          i18nResponse.headers.forEach((value, key) => {
            supabaseResponse.headers.set(key, value);
          });
          i18nResponse.cookies.getAll().forEach(({ name, value }) => {
            supabaseResponse.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from protected routes
  if (!user && pathWithoutLocale.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Redirect authenticated users away from auth pages
  if (user && (pathWithoutLocale === "/login" || pathWithoutLocale === "/signup")) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
