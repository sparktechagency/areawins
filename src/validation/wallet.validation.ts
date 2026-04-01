import { z } from "zod";

export const WalletPaymentMethod = {
  CRYPTO_USDT: "CRYPTO_USDT",
  STRIPE: "STRIPE",
  PAYPAL: "PAYPAL",
  BANK_TRANSFER: "BANK_TRANSFER",
  VISA_MASTERCARD: "VISA_MASTERCARD",
} as const;

export const depositSchema = z.object({
  amount: z.number().min(1, "Minimum deposit is 1"),
  paymentMethod: z.nativeEnum(WalletPaymentMethod),
  note: z.string().max(200).optional(),
});

export const withdrawSchema = z.object({
  amount: z.number().min(1, "Minimum withdrawal is 1"),
  paymentMethod: z.nativeEnum(WalletPaymentMethod),
  note: z.string().max(200).optional(),
});
