
export * from "./routes";
export * from "./sports";
export * from "./betTypes";

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Cookie names
export const COOKIES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_ID: "userId",
  BETTING_SLIP: "bettingSlip",
  THEME: "theme",
  LANGUAGE: "language",
  CURRENCY: "currency",
} as const;

// LocalStorage keys
export const STORAGE_KEYS = {
  BETTING_SLIP: "easybet_betting_slip",
  USER_PREFERENCES: "easybet_preferences",
  FAVORITE_TEAMS: "easybet_favorite_teams",
  FAVORITE_MATCHES: "easybet_favorite_matches",
  RECENT_SEARCHES: "easybet_recent_searches",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MATCHES_PER_PAGE: 20,
  BETS_PER_PAGE: 10,
  TRANSACTIONS_PER_PAGE: 15,
  MESSAGES_PER_PAGE: 30,
  NOTIFICATIONS_PER_PAGE: 20,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  FULL: "MMMM dd, yyyy",
  TIME: "HH:mm",
  DATE_TIME: "MMM dd, yyyy HH:mm",
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// Currency
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
] as const;

// Languages
export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
] as const;

// Social links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/easybet",
  TWITTER: "https://twitter.com/easybet",
  INSTAGRAM: "https://instagram.com/easybet",
  YOUTUBE: "https://youtube.com/easybet",
  TELEGRAM: "https://t.me/easybet",
} as const;

// Contact info
export const CONTACT_INFO = {
  EMAIL: "support@easybet.com",
  PHONE: "+1 (800) 123-4567",
  ADDRESS: "123 Sports Avenue, Gaming City, GC 12345",
  SUPPORT_HOURS: "24/7 Customer Support",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You need to log in to access this feature.",
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  INSUFFICIENT_BALANCE: "Insufficient balance to place this bet.",
  BET_LIMIT_EXCEEDED: "Bet amount exceeds the allowed limit.",
  ODDS_CHANGED: "Odds have changed. Please review and confirm.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  REGISTER_SUCCESS: "Account created successfully!",
  BET_PLACED: "Bet placed successfully!",
  DEPOSIT_SUCCESS: "Deposit completed successfully!",
  WITHDRAW_SUCCESS: "Withdrawal request submitted!",
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
} as const;
