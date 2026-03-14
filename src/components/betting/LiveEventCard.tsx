import { Button } from "@/components/ui/button";
import { IMatch } from "@/interfaces/match.interface";
import { Banknote, MapPin, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LiveEventCardProps {
  event: IMatch;
}

export default function LiveEventCard({ event }: LiveEventCardProps) {
  return (
    <div className="group/card relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="flex items-center gap-1.5 bg-rose-500/10 px-2 py-1 rounded-full text-[9px] font-black text-rose-500 uppercase tracking-widest border border-rose-500/20 w-fit">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            LIVE
            {event.liveStatus?.minute && (
              <span className="text-[8px]">{event.liveStatus.minute}'</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 opacity-70">
            {event.tournament?.logo && (
              <Image
                src={event.tournament.logo}
                alt={event.tournament.name || ""}
                width={16}
                height={12}
                className="rounded-sm object-cover"
              />
            )}
            <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">
              {event.tournament?.name || "Unknown Tournament"}
            </span>
          </div>
        </div>

        {/* Sport Icon */}
        <div className="flex items-center gap-1">
          {event.sport?.icon && (
            <div className="size-8 rounded-lg bg-muted p-1.5 border border-border/50">
              <Image
                src={event.sport.icon}
                alt={event.sport.name}
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Match Display */}
      <div className="relative flex items-center justify-between p-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative size-16 rounded-full bg-linear-to-br from-muted to-muted/50 p-1.5 overflow-hidden border-2 border-border/50 transition-all">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-all"></div>
            <Image
              src={event.homeTeam?.logo || "/placeholder-team.png"}
              alt={event.homeTeam?.name || "Home Team"}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[11px] font-black text-center max-w-[80px] leading-tight uppercase truncate transition-all">
            {event.homeTeam?.name || "Home Team"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-foreground tabular-nums">
                {event.homeScore || 0}
              </span>
              <span className="text-xl font-black text-muted-foreground/30">
                :
              </span>
              <span className="text-3xl font-black text-foreground tabular-nums">
                {event.awayScore || 0}
              </span>
            </div>
            {event.liveStatus?.period && (
              <div className="text-[8px] text-muted-foreground text-center mt-1 uppercase tracking-wider">
                {event.liveStatus.period}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative size-16 rounded-full bg-linear-to-br from-muted to-muted/50 p-1.5 overflow-hidden border-2 border-border/50 transition-all">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-all"></div>
            <Image
              src={event.awayTeam?.logo || "/placeholder-team.png"}
              alt={event.awayTeam?.name || "Away Team"}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[11px] font-black text-center max-w-[80px] leading-tight uppercase truncate transition-all">
            {event.awayTeam?.name || "Away Team"}
          </span>
        </div>
      </div>

      {/* Match Info */}
      {(event.venue || event.city) && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <MapPin className="size-3" />
            <span>
              {event.venue && `${event.venue}`}
              {event.venue && event.city && ", "}
              {event.city && `${event.city}`}
            </span>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-linear-to-br from-muted/20 to-muted/10 border-t border-border/50">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-muted-foreground uppercase flex items-center gap-1">
            <Banknote className="size-3 text-emerald-500" />
            Total Pot
          </span>
          <span className="text-lg font-black text-foreground tabular-nums">
            ${(event.totalBetsAmount || 0).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-muted-foreground uppercase flex items-center gap-1">
            <Users className="size-3 text-blue-500" />
            Active Bets
          </span>
          <span className="text-lg font-black text-foreground tabular-nums">
            {event.totalBetsCount || 0}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-2 p-4 pt-0">
        <Button
          className="flex-1 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-black text-[10px] uppercase tracking-widest h-11 rounded-lg shadow-lg hover:shadow-primary/25 transition-all"
          asChild
        >
          <Link
            href={
              event.sport
                ? `/matches/${event.sport.slug}/${event._id}`
                : `/matches/unknown/${event._id}`
            }
          >
            Browse Market
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-11 rounded-lg border-border hover:bg-primary hover:border-primary hover:text-white transition-all shrink-0"
          asChild
        >
          <Link
            href={
              event.sport
                ? `/matches/${event.sport.slug}/${event._id}?action=create`
                : `/matches/unknown/${event._id}?action=create`
            }
          >
            <PlusCircle className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
