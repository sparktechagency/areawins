"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Filter,
  Search,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { MOCK_TRANSACTIONS } from "@/data/transactions.data";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const TransactionsPage = () => {
  const { t } = useTranslation();
  const transactions = MOCK_TRANSACTIONS;

  const [searchTerm, setSearchTerm] = useState("");

  const typeMap: Record<string, string> = {
    Deposit: t("transactions.deposit"),
    Withdrawal: t("transactions.withdrawal"),
    "Bet Settlement": t("transactions.betSettlement"),
    "Bet Placed": t("transactions.betPlaced"),
    Commission: t("transactions.commission"),
  };

  const methodMap: Record<string, string> = {
    Bkash: t("transactions.bkash"),
    Nagad: t("transactions.nagad"),
    Platform: t("transactions.platform"),
    Referral: t("transactions.methodReferral"),
  };

  const statusMap: Record<string, string> = {
    Completed: t("transactions.completed"),
    Pending: t("transactions.pending"),
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl  text-foreground flex items-center gap-3 uppercase tracking-tight">
              {t("transactions.title")}{" "}
              <Wallet className="w-8 h-8 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">
              {t("transactions.subtitle")}
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 h-11 px-6 rounded-lg  uppercase tracking-widest text-xs gap-2"
          >
            <Download className="size-4" />{" "}
            {t("transactions.downloadStatement")}
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={t("transactions.searchPlaceholder")}
              className="pl-11 h-12 bg-card border-border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-12 px-6 rounded-lg  uppercase tracking-widest text-xs gap-2 border-border bg-card"
            >
              <Filter className="size-4" /> {t("transactions.dateRange")}
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-lg  uppercase tracking-widest text-xs gap-2 border-border bg-card"
            >
              <Filter className="size-4" /> {t("transactions.type")}
            </Button>
          </div>
        </div>

        {/* Transactions Card */}
        <Card className="border-border shadow-none bg-card overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="py-4 px-8 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                      {t("transactions.transactionId")}
                    </th>
                    <th className="py-4 px-4 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                      {t("transactions.dateTime")}
                    </th>
                    <th className="py-4 px-4 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                      {t("transactions.typeMethod")}
                    </th>
                    <th className="py-4 px-4 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap text-right">
                      {t("transactions.amount")}
                    </th>
                    <th className="py-4 px-8 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap text-right">
                      {t("transactions.status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-muted/10 transition-colors group"
                    >
                      <td className="py-5 px-8">
                        <span className="font-mono text-xs font-bold text-foreground/70">
                          {tx.id}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <p className="text-xs font-bold text-foreground">
                          {tx.date}
                        </p>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              tx.category === "Deposit"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : tx.category === "Withdrawal"
                                  ? "bg-rose-500/10 text-rose-500"
                                  : tx.category === "Winning"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-slate-500/10 text-slate-500"
                            }`}
                          >
                            {tx.type === "Deposit" ? (
                              <ArrowDownLeft className="size-4" />
                            ) : (
                              <ArrowUpRight className="size-4" />
                            )}
                          </div>
                          <div>
                            <p className=" text-xs text-foreground uppercase tracking-tight">
                              {typeMap[tx.type] || tx.type}
                            </p>
                            <p className="text-[10px] font-bold text-muted-foreground">
                              {methodMap[tx.method] || tx.method}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <p
                          className={` ${
                            tx.category === "Deposit" ||
                            tx.category === "Winning"
                              ? "text-emerald-500"
                              : "text-foreground"
                          }`}
                        >
                          {tx.category === "Deposit" ||
                          tx.category === "Winning"
                            ? "+"
                            : "-"}{" "}
                          {formatCurrency(tx.amount)}
                        </p>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <Badge
                          variant={
                            tx.status === "Completed" ? "default" : "secondary"
                          }
                          className={`${
                            tx.status === "Completed"
                              ? "bg-emerald-500 hover:bg-emerald-600"
                              : "bg-amber-500 hover:bg-amber-600"
                          } rounded-full  text-[9px] uppercase tracking-widest`}
                        >
                          {statusMap[tx.status] || tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="p-24 text-center">
                <p className="text-muted-foreground  uppercase tracking-widest text-xs">
                  {t("transactions.noTransactions")}
                </p>
              </div>
            )}
          </CardContent>
          <div className="p-6 border-t border-border flex justify-between items-center bg-muted/5">
            <p className="text-[10px]  text-muted-foreground uppercase tracking-widest">
              {t("transactions.showingCount")}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-lg  uppercase text-[10px] tracking-widest border-border bg-card"
              >
                {t("transactions.previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-lg  uppercase text-[10px] tracking-widest border-border bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/20"
              >
                {t("transactions.next")}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
