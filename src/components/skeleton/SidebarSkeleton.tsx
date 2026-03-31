import { Skeleton } from "@/components/ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-5 w-24 mx-3 mb-2 rounded" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-4 flex-1 rounded" />
          <Skeleton className="h-4 w-6 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
