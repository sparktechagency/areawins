import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, static files and internal Next.js assets.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
