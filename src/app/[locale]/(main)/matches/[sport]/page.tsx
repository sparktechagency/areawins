import SportsBettingInterface from "@/components/pages/main/matches/sports/SportsBettingInterface";

interface PageProps {
  params: Promise<{
    sport: string;
  }>;
}

export default async function SportPage({ params }: PageProps) {
  const { sport } = await params;

  return <SportsBettingInterface sport={sport} />;
}
