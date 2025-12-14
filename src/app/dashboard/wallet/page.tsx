"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet } from "lucide-react";
import Link from "next/link";

export default function WalletPage() {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Wallet <Wallet className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your funds and transactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           {/* Balance Card */}
           <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                 <p className="text-sm font-medium text-muted-foreground mb-2">Total Balance</p>
                 <div className="text-4xl font-bold text-primary mb-6">{formatCurrency(15450)}</div>
                 <div className="flex gap-4">
                    <Link href={ROUTES.WALLET_DEPOSIT || "/dashboard/wallet/deposit"} className="flex-1">
                        <Button className="w-full h-12 text-lg">
                           <ArrowDownLeft className="mr-2 h-5 w-5" /> Deposit
                        </Button>
                    </Link>
                    <Link href={ROUTES.WALLET_WITHDRAW || "/dashboard/wallet/withdraw"} className="flex-1">
                        <Button variant="outline" className="w-full h-12 text-lg">
                           <ArrowUpRight className="mr-2 h-5 w-5" /> Withdraw
                        </Button>
                    </Link>
                 </div>
              </CardContent>
           </Card>

           {/* Payment Methods */}
           <Card>
              <CardHeader>
                 <CardTitle>Payment Methods</CardTitle>
                 <CardDescription>Secure payment options</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                       <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6 text-muted-foreground" />
                          <div className="font-medium">Bkash</div>
                       </div>
                       <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                       <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6 text-muted-foreground" />
                          <div className="font-medium">Nagad</div>
                       </div>
                       <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
           <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
           </CardHeader>
           <CardContent>
              <div className="space-y-2">
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors">
                       <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${i === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                             {i === 1 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                          </div>
                          <div>
                             <p className="font-medium text-foreground">{i === 1 ? 'Deposit via Bkash' : 'Withdrawal'}</p>
                             <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`font-bold ${i === 1 ? 'text-green-600' : 'text-foreground'}`}>
                             {i === 1 ? '+' : '-'}{formatCurrency(5000)}
                          </p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                       </div>
                    </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
