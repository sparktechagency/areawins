export type UserRole = "CR" | "STUDENT";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/cr-register",
  "/auth/verify-otp",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/settings", "/change-password"],
  patterns: [/^\/profile/, /^\/settings/],
};

export const crProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/cr/],
  exact: [],
};

export const studentProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/student/],
  exact: [],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => pathname.startsWith(route));
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string,
): "CR" | "STUDENT" | "COMMON" | null => {
  if (isRouteMatches(pathname, crProtectedRoutes)) {
    return "CR";
  }
  if (isRouteMatches(pathname, studentProtectedRoutes)) {
    return "STUDENT";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "CR") {
    return "/dashboard/cr";
  }
  if (role === "STUDENT") {
    return "/dashboard/student";
  }
  return "/auth/login";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
