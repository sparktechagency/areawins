/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n/LanguageContext";
import { useInitiatePaymentMutation, useUploadBankReceiptMutation } from "@/redux/api/paymentApi";
import { useGetMyWalletQuery } from "@/redux/api/walletApi";
import { AlertCircle, Bitcoin, Building, CheckCircle, CreditCard, History, Info, Lock, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CardPaymentForm, CryptoPaymentView, LocalPaymentView } from "./PaymentForms";

// Constants aligned with backend
const PAYMENT_METHODS = [
  { id: "stripe", name: "Stripe", color: "bg-blue-600", icon: CreditCard },
  { id: "visa_mastercard", name: "Visa/MC", color: "bg-orange-500", icon: CreditCard },
  { id: "pago_movil", name: "Pago Móvil", color: "bg-sky-500", icon: Smartphone },
  { id: "bank_transfer", name: "Bank Transfer", color: "bg-red-600", icon: Building },
  { id: "crypto_usdt", name: "USDT", color: "bg-emerald-600", icon: Bitcoin },
  { id: "paypal", name: "PayPal", color: "bg-blue-800", icon: Wallet },
];

const RECENT_DEPOSITS = [
  { id: 1, date: "Dec 15", method: "Stripe", amount: "15.00", status: "Completed" },
  { id: 2, date: "Dec 10", method: "Bank Transfer", amount: "200.00", status: "Pending" },
  { id: 3, date: "Dec 5", method: "USDT", amount: "50.00", status: "Completed" },
];

const DepositPage = () => {
  const { t } = useTranslation();
  const { data: wallet, refetch: refetchWallet } = useGetMyWalletQuery();
  const [initiatePayment, { isLoading: isInitiating }] = useInitiatePaymentMutation();
  const [uploadReceipt, { isLoading: isUploading }] = useUploadBankReceiptMutation();
  
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Amount/Method, 2: Action (Redirect/Upload)
  const [paymentData, setPaymentData] = useState<any>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [externalRef, setExternalRef] = useState("");
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    if (!selectedMethod || !amount) {
      setFormMessage({
        type: "error",
        text: t("walletDeposit.toastFillAll") || "Please fill all fields",
      });
      return;
    }

    try {
      const response = await initiatePayment({
        method: selectedMethod,
        amount: Number(amount),
        type: "deposit"
      }).unwrap();

      if (response.success || response.data) {
        const data = response.data;
        setPaymentData(data);
        
        // Handle immediate redirects
        if (["paypal", "crypto_usdt", "stripe", "visa_mastercard"].includes(selectedMethod)) {
          const url = data.approvalUrl || data.invoiceUrl || data.checkoutUrl || data.clientSecret;
          if (url) {
             window.location.href = url;
             return;
          }
        }
        
        setStep(2);
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Failed to initiate deposit. Please ensure all details are correct.";
      setFormMessage({
        type: "error",
        text: errorMsg,
      });
    }
  };

  const handleReceiptUpload = async () => {
    setFormMessage(null);
    const txId = paymentData?.internalTxId || paymentData?.transactionId;
    if (!txId) {
      setFormMessage({
        type: "error",
        text: "Internal Transaction Error. Please try again.",
      });
      return;
    }

    if (!receiptFile) {
      setFormMessage({
        type: "error",
        text: "Please select a proof of payment image",
      });
      return;
    }

    try {
      await uploadReceipt({
        transactionId: txId,
        receipt: receiptFile,
        externalReference: externalRef
      }).unwrap();
      
      setFormMessage({
        type: "success",
        text: "Deposit request submitted! Our team will verify and approve it shortly.",
      });
      
      setTimeout(() => {
        setStep(1);
        setAmount("");
        setSelectedMethod(null);
        setReceiptFile(null);
        setExternalRef("");
        setPaymentData(null);
        setFormMessage(null);
        refetchWallet();
      }, 3000);
    } catch (error: any) {
      setFormMessage({
        type: "error",
        text: error?.data?.message || "An error occurred during submission",
      });
    }
  };

  const setPresetAmount = (amt: number) => {
    setAmount(amt.toString());
  };

  const balance = wallet?.totalBalance ?? 0;
  const lockedBalance = wallet?.lockedBalance ?? 0;

  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("walletDeposit.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("walletDeposit.subtitle")}
              </p>
            </div>
            {step === 2 && (
               <Button variant="ghost" onClick={() => setStep(1)} className="text-primary hover:text-primary/80">
                 ← Back to Selection
               </Button>
            )}
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#112218] border-primary/20 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                    {t("walletDeposit.availableBalance")}
                  </p>
                  <h2 className="text-3xl font-bold mt-2">
                    USD {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h2>
                </div>
                <Button
                  onClick={() => refetchWallet()}
                  className="bg-white text-primary hover:bg-gray-100 font-bold rounded-full"
                >
                  {t("walletDeposit.refresh")}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a2c24] border-white/10 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" /> {t("walletDeposit.lockedBonus")}
                  </p>
                  <h2 className="text-3xl font-bold mt-2 opacity-80">
                    USD {lockedBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {step === 1 ? (
                <>
                  {/* Step 1: Selection */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      {t("walletDeposit.step1")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        const isSelected = selectedMethod === method.id;
                        return (
                          <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={cn(
                              "cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all h-32 relative",
                              isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                            )}
                          >
                            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white", method.color)}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <p className="font-bold text-foreground text-sm">{method.name}</p>
                            {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      {t("walletDeposit.step2")}
                    </h3>
                    <Card className="bg-[#1a2c24]/50 border-white/5">
                      <CardContent className="p-6 space-y-6">
                        {formMessage && (
                          <div
                            className={cn(
                              "p-3 rounded-md flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-1",
                              formMessage.type === "success"
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-destructive/10 text-destructive border border-destructive/20",
                            )}
                          >
                            {formMessage.type === "success" ? (
                              <CheckCircle className="size-4 shrink-0" />
                            ) : (
                              <AlertCircle className="size-4 shrink-0" />
                            )}
                            {formMessage.text}
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label>{t("walletDeposit.amountToDeposit")}</Label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">USD</span>
                            <Input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="pl-12 h-12 bg-background border-input text-lg font-bold"
                              placeholder="50.00"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                {[10, 50, 100].map(amt => (
                                   <Button key={amt} size="sm" variant="ghost" className="h-8 bg-muted/50" onClick={() => setPresetAmount(amt)}>${amt}</Button>
                                ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleInitiate}
                          className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                          disabled={isInitiating || !amount || !selectedMethod}
                        >
                          {isInitiating ? "Processing..." : "Continue to Payment"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                /* Step 2: Payment Execution */
                <Card className="bg-[#1a2c24]/50 border-primary/20 animate-in fade-in slide-in-from-bottom-4">
                  <CardContent className="p-8 space-y-8">
                      <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex flex-col items-center justify-center border border-primary/30">
                           <span className="text-[10px] uppercase font-bold text-primary">STEP</span>
                           <span className="text-sm font-black leading-none text-primary">02</span>
                        </div>
                        <div>
                           <h3 className="text-xl font-bold">Complete Transaction</h3>
                           <p className="text-muted-foreground text-sm font-medium tracking-tight">Amount: <span className="text-white font-black">${amount}</span></p>
                        </div>
                     </div>

                     {formMessage && (
                        <div
                          className={cn(
                            "p-3 rounded-md flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-1",
                            formMessage.type === "success"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : "bg-destructive/10 text-destructive border border-destructive/20",
                          )}
                        >
                          {formMessage.type === "success" ? (
                            <CheckCircle className="size-4 shrink-0" />
                          ) : (
                            <AlertCircle className="size-4 shrink-0" />
                          )}
                          {formMessage.text}
                        </div>
                      )}

                     {["bank_transfer", "pago_movil"].includes(selectedMethod || "") ? (
                        <LocalPaymentView 
                           data={paymentData} 
                           method={selectedMethod} 
                           file={receiptFile}
                           onFileSelect={(e: any) => setReceiptFile(e.target.files?.[0] || null)}
                           externalRef={externalRef}
                           onExternalRefChange={setExternalRef}
                           onSubmit={handleReceiptUpload}
                           isLoading={isUploading}
                        />
                     ) : ["stripe", "visa_mastercard"].includes(selectedMethod || "") ? (
                        <CardPaymentForm 
                           onSubmit={() => setFormMessage({ type: "success", text: "Processing card payment..." })}
                           isLoading={false}
                        />
                     ) : ["crypto_usdt", "paypal"].includes(selectedMethod || "") ? (
                        <CryptoPaymentView data={paymentData} />
                     ) : null}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="bg-[#1a2c24] border-white/5 text-white">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                      <History className="w-4 h-4" /> {t("walletDeposit.recentDeposits")}
                    </h3>
                  </div>
                  <div className="p-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-400 text-xs border-b border-white/5">
                          <th className="text-left py-2 px-2 font-medium">{t("walletDeposit.date")}</th>
                          <th className="text-left py-2 px-2 font-medium">{t("walletDeposit.method")}</th>
                          <th className="text-right py-2 px-2 font-medium">{t("walletDeposit.status")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_DEPOSITS.map((tx) => (
                          <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-2 text-gray-300 text-[10px]">{tx.date}</td>
                            <td className="py-3 px-2 font-medium text-xs">{tx.method}</td>
                            <td className="py-3 px-2 text-right">
                              <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                tx.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                              )}>
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a2c24]/50 border-dashed border-primary/30">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Info className="w-5 h-5" /> {t("walletDeposit.importantInfo")}
                  </div>
                  <ul className="text-xs text-gray-400 space-y-3 list-disc pl-4 marker:text-primary">
                    <li>Minimum deposit amount is <span className="text-white font-bold">$10.00</span>.</li>
                    <li>For bank transfers, ensure the <span className="text-white">reference code</span> is included in your transfer note.</li>
                    <li>Crypto deposits depend on blockchain confirmations (usually 5-10 mins).</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepositPage;
