/**
 * Zod validation schemas for wallet and payment forms
 */

import { z } from "zod";

// Deposit schema
export const depositSchema = z.object({
  amount: z
    .number()
    .min(1, "Minimum deposit amount is $1")
    .max(10000, "Maximum deposit amount is $10,000"),
  paymentMethod: z.enum([
    "credit_card",
    "debit_card",
    "paypal",
    "bank_transfer",
    "crypto",
    "e_wallet",
  ]),
  currency: z.string().optional(),
  savePaymentMethod: z.boolean().optional(),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiryMonth: z.string().optional(),
  expiryYear: z.string().optional(),
  cvv: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  bankAccount: z.string().optional(),
  cryptoAddress: z.string().optional(),
});

export type DepositFormData = z.infer<typeof depositSchema>;

// Withdraw schema
export const withdrawSchema = z.object({
  amount: z
    .number()
    .min(10, "Minimum withdrawal amount is $10")
    .max(50000, "Maximum withdrawal amount is $50,000"),
  paymentMethod: z.enum([
    "credit_card",
    "debit_card",
    "paypal",
    "bank_transfer",
    "crypto",
    "e_wallet",
  ]),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
  routingNumber: z.string().optional(),
  cryptoAddress: z.string().optional(),
  cryptoCurrency: z.string().optional(),
  confirmWithdraw: z.boolean().refine((val) => val === true, "Please confirm withdrawal"),
});

export type WithdrawFormData = z.infer<typeof withdrawSchema>;

// Add payment method schema
export const addPaymentMethodSchema = z.object({
  type: z.enum([
    "credit_card",
    "debit_card",
    "paypal",
    "bank_transfer",
    "crypto",
    "e_wallet",
  ]),
  name: z.string().min(1, "Please provide a name for this payment method"),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiryMonth: z.string().optional(),
  expiryYear: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
  routingNumber: z.string().optional(),
  cryptoAddress: z.string().optional(),
  cryptoCurrency: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type AddPaymentMethodFormData = z.infer<typeof addPaymentMethodSchema>;

// Transaction filter schema
export const transactionFilterSchema = z.object({
  type: z.enum(["deposit", "withdraw", "bet", "winning", "refund", "bonus", "cashout"]).optional(),
  status: z.enum(["pending", "completed", "failed", "cancelled", "processing"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type TransactionFilterFormData = z.infer<typeof transactionFilterSchema>;
