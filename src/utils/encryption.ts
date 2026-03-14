import crypto from "crypto";
const ENCRYPTION_KEY = crypto.scryptSync(
  process.env.COOKIE_ENCRYPTION_KEY || "your-32-character-secret-key-here",
  "salt",
  32,
);
const ALGORITHM = "aes-256-gcm";

export interface EncryptedData {
  data: string;
  iv: string;
  tag: string;
}

export const encrypt = (text: string): EncryptedData => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  return {
    data: encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
};

export const decrypt = (encryptedData: EncryptedData): string => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    ENCRYPTION_KEY,
    Buffer.from(encryptedData.iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(encryptedData.tag, "hex"));

  let decrypted = decipher.update(encryptedData.data, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// Obfuscated cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "auth_at",
  REFRESH_TOKEN: "auth_rt",
  SESSION_ID: "auth_sid",
  USER_ROLE: "auth_ur",
  RESET_PASSWORD_TOKEN: "auth_rpt",
} as const;
