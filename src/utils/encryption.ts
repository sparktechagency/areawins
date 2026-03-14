import crypto from 'crypto';

// Encryption key - in production, this should come from environment variables
const ENCRYPTION_KEY = process.env.COOKIE_ENCRYPTION_KEY || 'your-32-character-secret-key-here';
const ALGORITHM = 'aes-256-gcm';

export interface EncryptedData {
  data: string;
  iv: string;
  tag: string;
}

export const encrypt = (text: string): EncryptedData => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  return {
    data: encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
};

export const decrypt = (encryptedData: EncryptedData): string => {
  const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
  decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
  
  let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Obfuscated cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'auth_at',
  REFRESH_TOKEN: 'auth_rt',
  SESSION_ID: 'auth_sid',
  USER_ROLE: 'auth_ur',
  RESET_PASSWORD_TOKEN: 'auth_rpt'
} as const;
