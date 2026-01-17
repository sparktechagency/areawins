"use client";

import { ReusableModal } from "@/components/shared/ReusableModal";
import { getBetOutcomesByMarket } from "@/data/betting.data";
import { CreateBetModalProps } from "@/interfaces/betting.interface";
import React, { useEffect, useMemo, useState } from "react";

// Sub-components
import OutcomeSelection from "./create-bet/OutcomeSelection";
import StakeConfiguration from "./create-bet/StakeConfiguration";
import StepIndicator from "./create-bet/StepIndicator";
import SuccessConfirmation from "./create-bet/SuccessConfirmation";

type Step = "SELECT_OUTCOME" | "SET_STAKE" | "CONFIRMATION";

const CreateBetModal: React.FC<CreateBetModalProps> = ({
  isOpen,
  onClose,
  match,
  selectedOutcome,
  marketName,
}) => {
  const [step, setStep] = useState<Step>("SELECT_OUTCOME");
  const [outcome, setOutcome] = useState<string | null>(null);
  const [selectedMarketName, setSelectedMarketName] = useState<string | null>(
    null
  );
  const [stake, setStake] = useState<number>(50);
  const [odds, setOdds] = useState<number>(2.0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync with props when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (selectedOutcome) {
          setOutcome(selectedOutcome);
          setSelectedMarketName(marketName || "Match Results");
          setStep("SET_STAKE");
        } else {
          setOutcome(null);
          setSelectedMarketName(null);
          setStep("SELECT_OUTCOME");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedOutcome, marketName]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("SELECT_OUTCOME");
        setOutcome(null);
        setSelectedMarketName(null);
        setStake(50);
        setOdds(2.0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const potentialWin = stake * odds;
  const opponentStake = potentialWin - stake;

  const handleCreate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep("CONFIRMATION");
    }, 1500);
  };

  const sportName = match.sport;
  const marketOutcomes = useMemo(
    () => getBetOutcomesByMarket(sportName, match),
    [match, sportName]
  );

  const handleOutcomeSelect = (
    selectedOutcomeLabel: string,
    selectedMarket: string
  ) => {
    setOutcome(selectedOutcomeLabel);
    setSelectedMarketName(selectedMarket);
    setStep("SET_STAKE");
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      padding="none"
      className="max-sm:h-[80vh]"
    >
      <div className="relative h-full flex flex-col">
        {/* Progress Bar */}
        <StepIndicator currentStep={step} />

        <div className="flex-1 overflow-y-auto no-scrollbar pt-1">
          {step === "SELECT_OUTCOME" && (
            <OutcomeSelection
              marketOutcomes={marketOutcomes}
              outcome={outcome}
              onSelect={handleOutcomeSelect}
            />
          )}

          {step === "SET_STAKE" && (
            <StakeConfiguration
              outcome={outcome}
              selectedMarketName={selectedMarketName}
              stake={stake}
              setStake={setStake}
              odds={odds}
              setOdds={setOdds}
              potentialWin={potentialWin}
              opponentStake={opponentStake}
              isProcessing={isProcessing}
              onBack={() => setStep("SELECT_OUTCOME")}
              onConfirm={handleCreate}
              showBackButton={!selectedOutcome}
            />
          )}

          {step === "CONFIRMATION" && (
            <SuccessConfirmation
              outcome={outcome}
              odds={odds}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </ReusableModal>
  );
};

export default CreateBetModal;
