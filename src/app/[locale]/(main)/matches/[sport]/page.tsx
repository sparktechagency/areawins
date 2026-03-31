import SportsBettingInterface from "@/components/pages/main/matches/sports/SportsBettingInterface";
export default async function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport } = await params;

  return <SportsBettingInterface sport={sport} />;
}
