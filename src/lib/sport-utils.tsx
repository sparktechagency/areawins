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
              <span className="text-lg sm:text-xl font-black text-foreground tabular-nums leading-none">
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
              <span className="text-lg sm:text-xl font-black text-foreground tabular-nums leading-none">
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
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
              :
            </span>
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
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
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
              :
            </span>
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
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
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
              :
            </span>
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.awayScore}
            </span>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
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
            <span className="text-sm font-black text-primary uppercase tracking-wider">
              {s.period || "VS"} {/* e.g., "Round 5" */}
            </span>
          </div>
          {match.status === "live" && s.minute && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
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
              <span className="text-xl font-black text-foreground tabular-nums">
                {s.homeScore > 0 ? `+${s.homeScore}` : s.homeScore}
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">
                Player 1
              </span>
            </div>
            <span className="text-xs font-black text-muted-foreground/30">
              vs
            </span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-foreground tabular-nums">
                {s.awayScore > 0 ? `+${s.awayScore}` : s.awayScore}
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">
                Player 2
              </span>
            </div>
          </div>
          {match.status === "live" && s.period && (
            <span className="text-[9px] font-black text-rose-500/80 uppercase">
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
            <span className="text-xl font-black text-foreground tabular-nums">
              {s.homeScore}
            </span>
            <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
              :
            </span>
            <span className="text-xl font-black text-foreground tabular-nums">
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
