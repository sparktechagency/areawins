"use client";
import LiveEventCard from "@/components/pages/main/matches/LiveEventCard";
import LiveEventsSectionSkeleton from "@/components/skeleton/LiveEventsSectionSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IMatch } from "@/interfaces/match.interface";
import { useGetLiveMatchesQuery } from "@/redux/api/matchApi";

const LiveEventsSection = () => {
  const {
    data: liveMatchesResponse,
    isLoading,
    isError,
  } = useGetLiveMatchesQuery({
    page: 1,
    limit: 10,
  });

  const liveEvents = liveMatchesResponse?.data?.results || [];

  if (isLoading) {
    return <LiveEventsSectionSkeleton />;
  }

  if (isError || liveEvents.length === 0) {
    return (
      <section className="w-full mt-8 relative ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl  text-foreground flex items-center gap-3 decoration-primary decoration-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
            </span>
            Live Market Activity
          </h2>
          <Badge
            variant="outline"
            className="text-muted-foreground border-border px-4 py-1   tracking-widest text-[10px]"
          >
            {isError ? "Error" : "No Live Matches"}
          </Badge>
        </div>

        <div className="text-center py-12 border border-border rounded-lg bg-card">
          <div className="text-muted-foreground text-sm">
            {isError
              ? "Failed to load live matches"
              : "No live matches available at the moment"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full container relative mt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl  text-foreground flex items-center gap-3 decoration-primary decoration-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          Live Market Activity
        </h2>
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-4 py-1  uppercase tracking-widest text-[10px]"
        >
          {liveEvents.length} Matches in Play
        </Badge>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full group">
        <CarouselContent className="-ml-6">
          {liveEvents.map((event: IMatch) => (
            <CarouselItem
              key={event?._id}
              className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <LiveEventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation */}
        <CarouselPrevious className="hidden sm:flex -left-6 size-12 border-border bg-card hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg hover:shadow-primary/25" />
        <CarouselNext className="hidden sm:flex -right-6 size-12 border-border bg-card hover:bg-primary hover:border-primary transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg hover:shadow-primary/25" />
      </Carousel>
    </section>
  );
};

export default LiveEventsSection;
