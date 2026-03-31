import { Badge } from "@/components/ui/badge";
import LiveEventCardSkeleton from "./LiveEventCardSkeleton";

const LiveEventsSectionSkeleton = () => {
  return (
    <section className="w-full container relative mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
        </div>
        <Badge
          variant="outline"
          className="h-6 w-32 border-muted bg-muted/20 animate-pulse"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <LiveEventCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default LiveEventsSectionSkeleton;
