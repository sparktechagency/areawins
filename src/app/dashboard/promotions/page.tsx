"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Gift } from "lucide-react";

export default function PromotionsPage() {
  const promotions = [
    {
      id: 1,
      title: "Welcome Bonus",
      description: "Get 100% match on your first deposit up to 10,000 BDT",
      code: "WELCOME100",
      expires: "No expiry",
      active: true,
      image: "linear-gradient(135deg, #00d65c 0%, #00b84d 100%)",
    },
    {
      id: 2,
      title: "Champions League Special",
      description: "Bet on any UCL match and get 10% cashback on losses",
      code: "UCL2024",
      expires: "Expires in 2 days",
      active: false,
      image: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    },
    {
      id: 3,
      title: "Accumulator Boost",
      description: "Boost your winnings by up to 50% on 5+ fold accumulators",
      code: "ACCA50",
      expires: "Always active",
      active: true,
      image: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Promotions & Bonuses <Gift className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Available offers tailored for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <Card
              key={promo.id}
              className="overflow-hidden border-border bg-card"
            >
              <div className="h-32 p-6 flex flex-col justify-end text-white relative ">
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-0"
                  >
                    {promo.active ? "Active" : "Available"}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">{promo.title}</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {promo.description}
                </p>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      Code
                    </span>
                    <code className="text-primary font-bold">{promo.code}</code>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    Copy
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {promo.expires}
                  </span>
                  <Button>
                    Claim Offer <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
