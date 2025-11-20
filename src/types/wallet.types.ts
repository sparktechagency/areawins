/**
 * Wallet, transactions, and payment related TypeScript type definitions
 */

export type TransactionType = "deposit" | "withdraw" | "bet" | "winning" | "refund" | "bonus" | "cashout";
export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled" | "processing";
export type PaymentMethod = "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "crypto" | "e_wallet";

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  recentBalance: number;
  currency: string;
  availableBalance: number; // Balance minus pending bets
  lockedBalance: number; // Amount in pending bets
  bonusBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  lastTransactionDate?: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  reference?: string;
  paymentMethod?: PaymentMethod;
  betId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  failureReason?: string;
}

export interface DepositRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  currency?: string;
  savePaymentMethod?: boolean;
  paymentDetails?: PaymentDetails;
}

export interface DepositResponse {
  transaction: Transaction;
  newBalance: number;
  paymentUrl?: string; // For redirecting to payment gateway
  message: string;
}

export interface WithdrawRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDetails: PaymentDetails;
}

export interface WithdrawResponse {
  transaction: Transaction;
  newBalance: number;
  estimatedArrival: Date;
  message: string;
}

export interface PaymentDetails {
  cardNumber?: string;
  cardHolder?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  paypalEmail?: string;
  bankAccount?: string;
  bankName?: string;
  routingNumber?: string;
  cryptoAddress?: string;
  cryptoCurrency?: string;
  eWalletId?: string;
}

export interface SavedPaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethod;
  name: string; // e.g., "Visa ending in 1234"
  details: Partial<PaymentDetails>;
  isDefault: boolean;
  isVerified: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

export interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
  page: number;
  totalPages: number;
  summary: TransactionSummary;
}

export interface TransactionSummary {
  totalDeposits: number;
  totalWithdrawals: number;
  totalBets: number;
  totalWinnings: number;
  netBalance: number;
}

export interface PaymentMethodsResponse {
  savedMethods: SavedPaymentMethod[];
  availableMethods: {
    type: PaymentMethod;
    name: string;
    icon: string;
    minDeposit: number;
    maxDeposit: number;
    minWithdraw: number;
    maxWithdraw: number;
    processingTime: string;
    fees: {
      depositFee: number;
      withdrawFee: number;
      feeType: "fixed" | "percentage";
    };
    isAvailable: boolean;
  }[];
}

export interface BalanceResponse {
  wallet: Wallet;
  recentTransactions: Transaction[];
}

export interface BonusOffer {
  id: string;
  name: string;
  description: string;
  type: "deposit_match" | "free_bet" | "cashback" | "risk_free";
  amount: number;
  percentage?: number;
  minDeposit?: number;
  maxBonus?: number;
  validUntil: Date;
  terms: string;
  isActive: boolean;
  isClaimed: boolean;
}

export interface ClaimBonusRequest {
  bonusId: string;
  depositAmount?: number;
}

export interface ClaimBonusResponse {
  bonus: BonusOffer;
  bonusAmount: number;
  newBalance: number;
  wagering Requirement: number;
  message: string;
}

export interface WalletState {
  wallet: Wallet | null;
  transactions: Transaction[];
  savedPaymentMethods: SavedPaymentMethod[];
  isLoading: boolean;
  error: string | null;
}

export interface DepositLimits {
  daily: {
    limit: number;
    used: number;
    remaining: number;
  };
  weekly: {
    limit: number;
    used: number;
    remaining: number;
  };
  monthly: {
    limit: number;
    used: number;
    remaining: number;
  };
}

export interface WithdrawLimits {
  daily: {
    limit: number;
    used: number;
    remaining: number;
  };
  weekly: {
    limit: number;
    used: number;
    remaining: number;
  };
  monthly: {
    limit: number;
    used: number;
    remaining: number;
  };
  minWithdraw: number;
  pendingWithdrawals: number;
}
