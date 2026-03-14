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
) => {
  const cookieStore = await cookies();
  
  // Use obfuscated name pattern
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;
  
  // Encrypt the value
  const encryptedValue = encrypt(value);
  const encryptedValueString = JSON.stringify(encryptedValue);
  
  cookieStore.set(cookieName, encryptedValueString, options);
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  
  // Use obfuscated name pattern
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;
  
  const encryptedValue = cookieStore.get(cookieName)?.value;
  
  if (!encryptedValue) return null;
  
  try {
    const encryptedData = JSON.parse(encryptedValue);
    return decrypt(encryptedData);
  } catch (error) {
    console.error('Failed to decrypt cookie:', error);
    return null;
  }
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  
  // Use obfuscated name pattern
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || `__${key.substring(0, 1)}_${key.substring(1, 3).toUpperCase()}_${key.substring(3, 4).toUpperCase()}`;
  
  cookieStore.delete(cookieName);
};
