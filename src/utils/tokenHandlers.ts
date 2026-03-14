"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { COOKIE_NAMES, decrypt, encrypt } from "./encryption";

export const setCookie = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>,
) => {
  const cookieStore = await cookies();
  
  // Encrypt the value
  const encryptedValue = encrypt(value);
  const encryptedString = JSON.stringify(encryptedValue);
  
  // Use obfuscated name if it exists in COOKIE_NAMES
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || key;
  
  cookieStore.set(cookieName, encryptedString, options);
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  
  // Use obfuscated name if it exists in COOKIE_NAMES
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || key;
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
  
  // Use obfuscated name if it exists in COOKIE_NAMES
  const cookieName = COOKIE_NAMES[key as keyof typeof COOKIE_NAMES] || key;
  
  cookieStore.delete(cookieName);
};
