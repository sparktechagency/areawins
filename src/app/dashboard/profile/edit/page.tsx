"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Camera, CheckCircle2, Copy, CreditCard, Gift, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner

export default function EditProfilePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        username: user?.username || "rahim_betpro",
        fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Rahim Ahmed",
        email: user?.email || "rahim.ahmed@example.com",
        phone: user?.phone || "1711223344",
        dob: "1995-08-15",
        address: "Flat 4B, House 12, Road 5, Dhanmondi, Dhaka-1209"
    });

    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Profile updated successfully");
        setLoading(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar Settings Navigation */}
                <div className="w-full lg:w-64 space-y-2">
                    <Card className="bg-card border-border overflow-hidden">
                        <div className="p-6 text-center border-b border-border bg-muted/20">
                            <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-primary">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                                    {formData.fullName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-lg">{formData.fullName}</h3>
                            <div className="flex items-center justify-center gap-1 text-green-500 text-xs font-bold mt-1">
                                <CheckCircle2 className="w-3 h-3" /> Verified User
                            </div>
                        </div>
                        <nav className="p-2 space-y-1">
                            <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary font-bold">
                                <User className="w-4 h-4" /> Personal Info
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted">
                                <ShieldCheck className="w-4 h-4" /> KYC Verification
                                <span className="ml-auto text-[10px] bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded">DONE</span>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted">
                                <Lock className="w-4 h-4" /> Security
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted">
                                <CreditCard className="w-4 h-4" /> Payment Methods
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted">
                                <Bell className="w-4 h-4" /> Notifications
                            </Button>
                        </nav>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Personal Information</h1>
                            <p className="text-muted-foreground">Manage your personal details and contact information.</p>
                        </div>
                        <Button onClick={handleSave} disabled={loading} className="px-6 font-bold shadow-lg shadow-primary/20">
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>

                    {/* Profile Picture Upload */}
                    <Card className="bg-[#1a2c24]/30 border-dashed border-2 border-white/10">
                        <CardContent className="p-6 flex items-center gap-6">
                            <div className="relative group cursor-pointer">
                                <Avatar className="w-20 h-20 border-2 border-white/10 group-hover:border-primary transition-colors">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" />
                                    <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold">Profile Picture</h4>
                                <p className="text-sm text-muted-foreground mb-3">JPG, GIF or PNG. Max size of 800K.</p>
                                <div className="flex gap-3">
                                    <Button size="sm" variant="outline" className="bg-background">Upload New</Button>
                                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">Remove</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Grid */}
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="bg-muted/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Username</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                                        <Input
                                            name="username"
                                            value={formData.username}
                                            className="pl-7 bg-muted/10"
                                            readOnly
                                        />
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <div className="flex">
                                        <div className="flex items-center px-3 bg-muted/50 border border-r-0 border-input rounded-l-md text-muted-foreground">
                                            +880
                                        </div>
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="rounded-l-none bg-muted/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-muted/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Date of Birth</Label>
                                    <Input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="bg-muted/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Address</Label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full min-h-[80px] rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* KYC Section */}
                    <Card className="border-green-500/20 bg-green-500/5">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/20 rounded-full text-green-500">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold flex items-center gap-2">
                                        KYC Verification
                                        <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded font-bold">VERIFIED</span>
                                    </h4>
                                    <p className="text-sm text-muted-foreground">Your identity has been verified. You can withdraw unlimited funds.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Two Factor & Referrals Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#1a2c24] border-white/5 text-white">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 font-bold text-lg">
                                    <Lock className="w-5 h-5 text-primary" /> Two-Factor Auth
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-400">Secure your account with Google Authenticator.</p>
                                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="font-medium text-sm">Status: <span className="text-red-400">Disabled</span></span>
                                    <Switch checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-[#1a2c24] to-primary/20 border-primary/20 text-white">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 font-bold text-lg">
                                    <Gift className="w-5 h-5 text-primary" /> Refer & Earn
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-400">Share your code and earn 5% on every deposit.</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-black/30 p-2 rounded font-mono text-center border border-white/10 text-green-400 font-bold tracking-widest">
                                        RAHIM505
                                    </div>
                                    <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => copyToClipboard("RAHIM505")}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
