import Cookies from "js-cookie";
export const COOKIE_NAMES = {
  accessToken: "__a_A_T",
  refreshToken: "__a_R_T",
  sessionId: "__a_S_I",
  userRole: "__a_U_R",
  resetPasswordToken: "__a_R_P_T",
} as const;

type CookieKey = keyof typeof COOKIE_NAMES;

export const setClientCookie = (
  key: CookieKey,
  value: string,
  options: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "Lax",
    // In production, ensure cookies are secure
    secure: process.env.NODE_ENV === "production",
  }
) => {
  Cookies.set(COOKIE_NAMES[key], value, options);
};

export const getClientCookie = (key: CookieKey) => {
  return Cookies.get(COOKIE_NAMES[key]);
};

export const removeClientCookie = (key: CookieKey) => {
  Cookies.remove(COOKIE_NAMES[key], { path: "/" });
};

export const clearAllAuthCookies = () => {
  Object.keys(COOKIE_NAMES).forEach((key) => {
    removeClientCookie(key as CookieKey);
  });
};
