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
  _type: "compact" | "detailed" = "compact",
) => {
  const sportSlug = getSportSlug(match.sport);
  const statusLine = match.liveStatus;

  // Prioritize scoreDisplay if it exists
  if (match.scoreDisplay) {
    return (
      <div className="flex flex-col items-center gap-1.5 sm:gap-3">
        <div className="flex flex-col items-center gap-1 sm:gap-2 px-4 py-2 sm:px-8 sm:py-4 bg-primary/10 rounded-md border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
          <span className="text-2xl font-semibold text-primary tabular-nums text-center tracking-tighter leading-none">
            {match.scoreDisplay}
          </span>
        </div>
        {match.isLive && (match.matchClock || (statusLine && statusLine.minute)) && (
          <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20 animate-in fade-in slide-in-from-top-1 duration-500">
            <span className="size-1.5 sm:size-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-[9px] sm:text-[11px] font-bold text-rose-500 uppercase tracking-[0.2em] leading-none">
              LIVE {match.matchClock || `${statusLine?.minute}'`}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (!statusLine && match.status !== "live") {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-muted/30 rounded-lg">
        <span className="text-sm  text-muted-foreground/50 uppercase tracking-widest">
          VS
        </span>
      </div>
    );
  }

  // Fallback safe status object
  const s = (statusLine || {
    homeScore: 0,
    awayScore: 0,
    period: "",
  }) as MatchLiveStatus;

  switch (sportSlug) {
    // Cricket - Runs/Wickets (Overs)
    case "cricket":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl  text-foreground tabular-nums leading-none">
                {s.homeScore}/{s.homeWickets ?? 0}
              </span>
              {s.homeOvers && (
                <span className="text-[8px] font-bold text-muted-foreground uppercase">
                  ({s.homeOvers} ov)
                </span>
              )}
            </div>
            <span className="text-xs  text-muted-foreground/30 mx-0.5">
              {" "}
              vs{" "}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl  text-foreground tabular-nums leading-none">
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

    // Tennis - Sets and Games
    case "tennis":
    case "badminton":
    case "table-tennis":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
            <span className="text-xl  text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm  text-muted-foreground/30 mx-0.5">:</span>
            <span className="text-xl  text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px]  text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.period} {/* e.g., "Set 2" */}
            </span>
          )}
        </div>
      );

    // American Football - Quarters
    case "american-football":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
            <span className="text-xl  text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm  text-muted-foreground/30 mx-0.5">:</span>
            <span className="text-xl  text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px]  text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.period} {s.minute ? `${s.minute}:00` : ""}{" "}
              {/* e.g., "Q3 8:45" */}
            </span>
          )}
        </div>
      );

    // Baseball - Innings
    case "baseball":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
            <span className="text-xl  text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm  text-muted-foreground/30 mx-0.5">:</span>
            <span className="text-xl  text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px]  text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.period} {/* e.g., "Top 7th" */}
            </span>
          )}
        </div>
      );

    // Boxing/MMA - Rounds
    case "boxing":
    case "mma":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-1.5 bg-primary/10 rounded-lg">
            <span className="text-sm  text-primary uppercase tracking-wider">
              {s.period || "VS"} {/* e.g., "Round 5" */}
            </span>
          </div>
          {match.status === "live" && s.minute && (
            <span className="text-[9px]  text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.minute}:00
            </span>
          )}
        </div>
      );

    // Golf - Strokes (Under/Over Par)
    case "golf":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xl  text-foreground tabular-nums">
                {s.homeScore > 0 ? `+${s.homeScore}` : s.homeScore}
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">
                Player 1
              </span>
            </div>
            <span className="text-xs  text-muted-foreground/30">vs</span>
            <div className="flex flex-col items-center">
              <span className="text-xl  text-foreground tabular-nums">
                {s.awayScore > 0 ? `+${s.awayScore}` : s.awayScore}
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">
                Player 2
              </span>
            </div>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px]  text-rose-500/80 uppercase">
              {s.period} {/* e.g., "Hole 14" */}
            </span>
          )}
        </div>
      );

    // Football, Basketball, Volleyball, Rugby, Hockey, Handball - Standard Score
    case "football":
    case "basketball":
    case "volleyball":
    case "rugby":
    case "hockey":
    case "handball":
    default:
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
            <span className="text-xl  text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm  text-muted-foreground/30 mx-0.5">:</span>
            <span className="text-xl  text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px]  text-rose-500/80 uppercase tracking-tighter animate-pulse">
              {s.minute ? `${s.minute}' ` : ""}
              {s.period}
            </span>
          )}
        </div>
      );
  }
};
