
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  BETS: "/bets",
  MORE: "/more",

  // Sports routes
  FOOTBALL: "/football",
  CRICKET: "/cricket",
  BASKETBALL: "/basketball",
  VOLLEYBALL: "/volleyball",
  BASEBALL: "/baseball",
  TENNIS: "/tennis",
  BOXING: "/boxing",

  // Match routes
  LIVE_EVENTS: "/live-events",
  UPCOMING: "/upcoming",
  MATCH_DETAIL: (id: string) => `/match/${id}`,

  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  MY_BETS: "/dashboard/my-bets",
  MY_BETS_ACTIVE: "/dashboard/my-bets/active",
  MY_BETS_WON: "/dashboard/my-bets/won",
  MY_BETS_LOST: "/dashboard/my-bets/lost",
  PROFILE: "/dashboard/profile",
  EDIT_PROFILE: "/dashboard/edit-profile",
  WALLET: "/dashboard/wallet",
  WALLET_DEPOSIT: "/dashboard/wallet/deposit",
  WALLET_WITHDRAW: "/dashboard/wallet/withdraw",
  TRANSACTIONS: "/dashboard/transactions",
  FAVORITES: "/dashboard/favorites",
  MESSAGES: "/dashboard/messages",
  NOTIFICATIONS: "/dashboard/notifications",
  SETTINGS: "/dashboard/settings",
  PROMOTIONS: "/dashboard/promotions",
  STATISTICS: "/dashboard/statistics",
  SUPPORT: "/dashboard/support",
} as const;


/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.BETS,
  ROUTES.MORE,
  ROUTES.FOOTBALL,
  ROUTES.CRICKET,
  ROUTES.BASKETBALL,
  ROUTES.VOLLEYBALL,
  ROUTES.BASEBALL,
  ROUTES.TENNIS,
  ROUTES.BOXING,
  ROUTES.LIVE_EVENTS,
  ROUTES.UPCOMING,
  "/match", // Match detail pages
];

/**
 * Auth routes (login, register, etc.)
 */
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.VERIFY_EMAIL,
  ROUTES.RESET_PASSWORD,
];

/**
 * Protected routes that require authentication
 */
export const PROTECTED_ROUTES = [
  "/dashboard",
];

/**
 * Route names for display
 */
export const ROUTE_NAMES: Record<string, string> = {
  [ROUTES.HOME]: "Home",
  [ROUTES.ABOUT]: "About",
  [ROUTES.CONTACT]: "Contact",
  [ROUTES.BETS]: "Bets",
  [ROUTES.MORE]: "More",
  [ROUTES.FOOTBALL]: "Football",
  [ROUTES.CRICKET]: "Cricket",
  [ROUTES.BASKETBALL]: "Basketball",
  [ROUTES.VOLLEYBALL]: "Volleyball",
  [ROUTES.BASEBALL]: "Baseball",
  [ROUTES.TENNIS]: "Tennis",
  [ROUTES.BOXING]: "Boxing",
  [ROUTES.LIVE_EVENTS]: "Live Events",
  [ROUTES.UPCOMING]: "Upcoming Matches",
  [ROUTES.LOGIN]: "Login",
  [ROUTES.REGISTER]: "Register",
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.MY_BETS]: "My Bets",
  [ROUTES.PROFILE]: "Profile",
  [ROUTES.WALLET]: "Wallet",
  [ROUTES.TRANSACTIONS]: "Transactions",
  [ROUTES.FAVORITES]: "Favorites",
  [ROUTES.MESSAGES]: "Messages",
  [ROUTES.NOTIFICATIONS]: "Notifications",
  [ROUTES.SETTINGS]: "Settings",
};
