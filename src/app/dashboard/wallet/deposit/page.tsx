"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner

export default function DepositPage() {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !method) {
            toast.error("Please select a method and enter an amount");
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success(`Deposit of ${amount} BDT via ${method} initiated!`);
        setLoading(false);
        setAmount("");
        setMethod("");
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        Deposit Funds <Wallet className="w-8 h-8 text-primary" />
                    </h1>
                    <p className="text-muted-foreground">Add money to your EasyBet wallet instantly.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Select Payment Method</CardTitle>
                        <CardDescription>Choose your preferred payment gateway.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            {["bKash", "Nagad", "Rocket"].map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setMethod(m)}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${method === m
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border hover:border-primary/50 text-muted-foreground"
                                        }`}
                                >
                                    {/* Placeholder icons or text logos */}
                                    <span className="font-bold text-lg">{m}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Enter Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleDeposit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (BDT)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="500"
                                        className="pl-10"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="100"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Min. Deposit: 100 BDT</p>
                            </div>

                            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                                {loading ? "Processing..." : "Proceed to Payment"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
