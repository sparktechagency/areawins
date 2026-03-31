"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./encryption";

// Obfuscated cookie name patterns
const COOKIE_NAMES = {
  accessToken: "__a_A_T",
  refreshToken: "__a_R_T", 
  sessionId: "__a_S_I",
  userRole: "__a_U_R",
  resetPasswordToken: "__a_R_P_T"
} as const;

export const setCookie = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>,
  shouldEncrypt: boolean = true,
) => {
  const cookieStore = await cookies();

  // Use obfuscated name pattern
  const cookieName =
    COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] ||
    `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;

  let cookieValue = value;
  if (shouldEncrypt) {
    // Encrypt the value
    const encryptedValue = encrypt(value);
    cookieValue = JSON.stringify(encryptedValue);
  }

  cookieStore.set(cookieName, cookieValue, options);
};

export const getCookie = async (key: string, shouldDecrypt: boolean = true) => {
  const cookieStore = await cookies();

  // Use obfuscated name pattern
  const cookieName =
    COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] ||
    `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;

  const cookieValue = cookieStore.get(cookieName)?.value;

  if (!cookieValue) return null;

  if (!shouldDecrypt) return cookieValue;

  try {
    const encryptedData = JSON.parse(cookieValue);
    return decrypt(encryptedData);
  } catch (error) {
    console.error("Failed to decrypt cookie:", error);
    return null;
  }
};


export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  
  // Use obfuscated name pattern
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;
  
  cookieStore.delete(cookieName);
};
