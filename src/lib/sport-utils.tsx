import {
  MatchInfo,
  MatchLiveStatus,
  SportInfo,
} from "@/interfaces/match.interface";

export const getSportSlug = (sport: string | SportInfo | undefined): string => {
  if (!sport) return "football";
  return typeof sport === "string" ? sport : sport.slug;
};

export const renderSportScore = (
  match: MatchInfo,
  _type: "compact" | "detailed" = "compact"
) => {
  const sportSlug = getSportSlug(match.sport);
  const statusLine = match.liveStatus;

  if (!statusLine && match.status !== "live") {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-muted/30 rounded-lg">
        <span className="text-sm font-black text-muted-foreground/50 uppercase tracking-widest">
          VS
        </span>
      </div>
    );
  }

  // Fallback safe status object with optional cricket fields
  const s = (statusLine || {
    homeScore: 0,
    awayScore: 0,
    period: "",
  }) as MatchLiveStatus;

  switch (sportSlug) {
    case "cricket":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-black text-foreground tabular-nums leading-none">
                {s.homeScore}/{s.homeWickets ?? 0}
              </span>
              {s.homeOvers && (
                <span className="text-[8px] font-bold text-muted-foreground uppercase">
                  ({s.homeOvers} ov)
                </span>
              )}
            </div>
            <span className="text-xs font-black text-muted-foreground/30 mx-0.5">
              {" "}
              vs{" "}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-black text-foreground tabular-nums leading-none">
                {s.awayScore}/{s.awayWickets ?? 0}
              </span>
              {s.awayOvers && (
                <span className="text-[8px] font-bold text-muted-foreground uppercase">
                  ({s.awayOvers} ov)
                </span>
              )}
            </div>
          </div>
        </div>
      );

    case "basketball":
    case "volleyball":
    case "football":
    default:
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
            <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
              :
            </span>
            <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.minute ? `${s.minute}' ` : ""}
              {s.period}
            </span>
          )}
        </div>
      );
  }
};
