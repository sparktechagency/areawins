import SportsBettingInterface from "@/components/pages/sports/SportsBettingInterface";
import React from "react";

const BoxingPage = () => {
  return (
    <div className="w-full container mx-auto px-4 py-8">
      <SportsBettingInterface sport="boxing" />
    </div>
  );
};

export default BoxingPage;
