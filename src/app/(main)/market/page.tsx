"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export default function BetMarketPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">Bet Market Insights</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Market Trends */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                Market Volume Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed border-border">
                            <p className="text-muted-foreground">Market Volume Chart Visualization</p>
                            {/* This would be a recharts component in a real app */}
                        </CardContent>
                    </Card>

                    {/* Top Mover */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Movers</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <div>
                                            <div className="font-bold text-foreground">Man City</div>
                                            <div className="text-xs text-muted-foreground">vs Arsenal</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-red-500 flex items-center gap-1">
                                                1.85
                                                <span className="text-[10px] bg-red-500/10 px-1 rounded">▼</span>
                                            </div>
                                            <div className="text-xs text-gray-500 line-through">2.10</div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-primary text-black">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">Market Alert</h3>
                                <p className="text-sm opacity-90 mb-4">
                                    Heavy betting volume detected on <strong>Under 2.5 Goals</strong> in Liverpool vs Chelsea match.
                                </p>
                                <button className="w-full py-2 bg-black text-white rounded-lg font-bold text-sm">
                                    View Market
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
