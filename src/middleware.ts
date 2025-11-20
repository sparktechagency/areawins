/**
 * Next.js Middleware
 * Handles authentication and route protection
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIES, PUBLIC_ROUTES, AUTH_ROUTES, PROTECTED_ROUTES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const isAuthenticated = !!accessToken;

  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    if (route === "/match") {
      return pathname.startsWith("/match/");
    }
    return pathname === route || pathname.startsWith(route + "/");
  });

  // Check if the route is an auth route
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login if trying to access protected routes
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
