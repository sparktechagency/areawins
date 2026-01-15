import { Transaction } from "@/interfaces/transaction.interface";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-123456",
    date: "2024-03-20 14:30",
    type: "Deposit",
    method: "Bkash",
    amount: 5000,
    status: "Completed",
    category: "Deposit",
  },
  {
    id: "TX-123457",
    date: "2024-03-19 10:15",
    type: "Withdrawal",
    method: "Nagad",
    amount: 2500,
    status: "Pending",
    category: "Withdrawal",
  },
  {
    id: "TX-123458",
    date: "2024-03-18 22:45",
    type: "Bet Settlement",
    method: "Platform",
    amount: 1250,
    status: "Completed",
    category: "Winning",
  },
  {
    id: "TX-123459",
    date: "2024-03-18 16:30",
    type: "Bet Placed",
    method: "Platform",
    amount: 500,
    status: "Completed",
    category: "Expense",
  },
  {
    id: "TX-123460",
    date: "2024-03-17 09:20",
    type: "Commission",
    method: "Referral",
    amount: 45,
    status: "Completed",
    category: "Winning",
  },
];
