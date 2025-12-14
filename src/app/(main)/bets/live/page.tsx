"use client";

import SportsBettingInterface from "@/components/pages/sports/SportsBettingInterface";
import { Badge } from "@/components/ui/badge";

export default function LiveBetsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                    <h1 className="text-3xl font-bold text-foreground">Live Betting</h1>
                    <Badge variant="outline" className="text-muted-foreground border-border">12 Events Active</Badge>
                </div>

                {/* Reusing the interface but focusing on live content */}
                <SportsBettingInterface sport="football" />
            </div>
        </div>
    );
}
