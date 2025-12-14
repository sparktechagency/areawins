"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            My Profile <User className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            View and edit your personal information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="md:col-span-1">
              <CardContent className="p-6 flex flex-col items-center">
                 <Avatar className="w-32 h-32 mb-4 border-2 border-primary">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-4xl">{user?.firstName?.[0] || "U"}</AvatarFallback>
                 </Avatar>
                 <h2 className="text-xl font-bold text-center">{user?.firstName} {user?.lastName}</h2>
                 <p className="text-muted-foreground">{user?.email}</p>
                 <p className="text-sm text-primary font-medium mt-1">Verified User</p>
                 
                 <Button className="w-full mt-6" variant="outline">Change Avatar</Button>
              </CardContent>
           </Card>

           <Card className="md:col-span-2">
              <CardHeader>
                 <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>First Name</Label>
                       <Input value={user?.firstName || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                       <Label>Last Name</Label>
                       <Input value={user?.lastName || ""} readOnly />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input value={user?.email || ""} readOnly />
                 </div>
                 <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input value={user?.phone || "+880 1XXX XXXXXX"} readOnly />
                 </div>
                 
                 <div className="pt-4 flex justify-end">
                    <Button>Edit Profile</Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
