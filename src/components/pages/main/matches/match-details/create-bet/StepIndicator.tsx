"use client";

import React from "react";

interface StepIndicatorProps {
  currentStep: "SELECT_OUTCOME" | "SET_STAKE" | "CONFIRMATION";
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: "SELECT_OUTCOME", progress: "33%" },
    { id: "SET_STAKE", progress: "66%" },
    { id: "CONFIRMATION", progress: "100%" },
  ];

  const currentProgress =
    steps.find((s) => s.id === currentStep)?.progress || "0%";

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-muted z-50">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: currentProgress }}
      />
    </div>
  );
};

export default StepIndicator;
