import MatchDetailsContent from "@/components/pages/sports/components/match-details/MatchDetailsContent";

interface PageProps {
  params: Promise<{
    sport: string;
    id: string;
  }>;
}

export default async function MatchDetailsPage({ params }: PageProps) {
  const { sport, id } = await params;

  return <MatchDetailsContent sport={sport} id={id} />;
}
