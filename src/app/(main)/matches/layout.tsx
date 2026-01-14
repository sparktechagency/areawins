import MatchesLayoutWrapper from "@/components/shared/matches/MatchesLayoutWrapper";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MatchesLayoutWrapper>{children}</MatchesLayoutWrapper>;
}
