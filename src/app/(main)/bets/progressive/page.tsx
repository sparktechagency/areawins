"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Trophy, Zap } from "lucide-react";

export default function ProgressiveBetsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        Progressive Jackpots
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Place bets on selected events and stand a chance to win the growing jackpot pool!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Jackpot Card 1 */}
                    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary transition-all group">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge className="bg-primary text-black font-bold">MEGA JACKPOT</Badge>
                                <Trophy className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <CardTitle className="text-2xl">Football Super 6</CardTitle>
                            <CardDescription>Predict 6 correct scores</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary mb-6">৳ 2,500,000</div>
                            <Button className="w-full font-bold">Play Now</Button>
                        </CardContent>
                    </Card>

                    {/* Jackpot Card 2 */}
                    <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 hover:border-blue-500 transition-all group">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge className="bg-blue-500 text-white font-bold">DAILY 5</Badge>
                                <Zap className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <CardTitle className="text-2xl">Daily Cricket 5</CardTitle>
                            <CardDescription>Pick 5 winners correctly</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-blue-500 mb-6">৳ 50,000</div>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold">Play Now</Button>
                        </CardContent>
                    </Card>

                    {/* Coming Soon */}
                    <Card className="border-border border-dashed bg-transparent opacity-75">
                        <CardContent className="flex flex-col items-center justify-center h-full min-h-[250px] text-center">
                            <h3 className="text-xl font-bold text-muted-foreground mb-2">More Coming Soon</h3>
                            <p className="text-sm text-muted-foreground max-w-[200px]">We are constantly creating new exciting jackpot pools for you.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
