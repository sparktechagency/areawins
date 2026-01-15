export const getMockStats = (id: string, homeTeam: string) => {
  // Simple seed based on string ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return {
    activeBets: Math.floor(pseudoRandom(hash) * 20) + 5,
    potAmount: Math.floor(pseudoRandom(hash + 1) * 5000) + 500,
    openBets: Math.floor(pseudoRandom(hash + 2) * 10) + 2,
    popularOutcome: homeTeam + " Win",
  };
};
