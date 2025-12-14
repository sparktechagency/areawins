"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownLeft, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function WithdrawPage() {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Withdrawal request submitted successfully!");
        setLoading(false);
        setAmount("");
        setAccountNumber("");
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        Withdraw Funds <ArrowDownLeft className="w-8 h-8 text-primary" />
                    </h1>
                    <p className="text-muted-foreground">Transfer winnings to your personal account.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Withdrawal Details</CardTitle>
                        <CardDescription>Enter the details for your withdrawal request.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleWithdraw} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Withdraw Method</Label>
                                    <Select onValueChange={setMethod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bkash">bKash</SelectItem>
                                            <SelectItem value="nagad">Nagad</SelectItem>
                                            <SelectItem value="rocket">Rocket</SelectItem>
                                            <SelectItem value="bank">Bank Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="account">Account Number</Label>
                                    <Input
                                        id="account"
                                        placeholder="e.g. 017XXXXXXXX"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Withdrawal Amount</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="1000"
                                        className="pl-10"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="500"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Min: 500 BDT</span>
                                    <span>Available Balance: 0.00 BDT</span>
                                </div>
                            </div>

                            <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                                <p><strong>Note:</strong> Withdrawals are processed within 24 hours. Ensure your account details are correct to avoid delays.</p>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
                                    {loading ? "Submitting..." : "Request Withdrawal"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
