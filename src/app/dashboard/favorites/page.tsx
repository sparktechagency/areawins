"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Favorites <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Quick access to your favorite leagues and teams
          </p>
        </div>

        <Card>
           <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                 <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                 Star leagues and matches to see them appear here for quick access.
              </p>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
