"use client";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { getBetOutcomesByMarket } from "@/data/betting.data";
import { CreateBetModalProps } from "@/interfaces/betting.interface";
import { useCreateBetMutation } from "@/redux/api/betApi";
import { useGetMyWalletQuery } from "@/redux/api/walletApi";
import { openAuthModal } from "@/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBetSchema } from "@/validation/bet.validation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

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
  marketId,
  marketOutcomes: passedMarketOutcomes,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: wallet } = useGetMyWalletQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [createBet, { isLoading: isCreating }] = useCreateBetMutation();

  const [step, setStep] = useState<Step>("SELECT_OUTCOME");
  const [outcome, setOutcome] = useState<string | null>(null);
  const [selectedMarketName, setSelectedMarketName] = useState<string | null>(
    null,
  );
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [stake, setStake] = useState<number>(50);
  const [odds, setOdds] = useState<number>(2.0);

  // Sync with props when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (selectedOutcome) {
          setOutcome(selectedOutcome);
          setSelectedMarketName(marketName || "Match Results");
          setSelectedMarketId(marketId || null);
          setStep("SET_STAKE");
        } else {
          setOutcome(null);
          setSelectedMarketName(null);
          setSelectedMarketId(null);
          setStep("SELECT_OUTCOME");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedOutcome, marketName, marketId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("SELECT_OUTCOME");
        setOutcome(null);
        setSelectedMarketName(null);
        setSelectedMarketId(null);
        setStake(50);
        setOdds(2.0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const potentialWin = stake * odds;
  const opponentStake = potentialWin - stake;

  const handleCreate = async () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal({ view: "LOGIN" }));
      onClose();
      return;
    }

    if (!wallet) {
      toast.error("Unable to load wallet information. Please refresh.");
      return;
    }

    if (wallet.totalBalance < stake) {
      toast.error("Insufficient balance. Please deposit funds to place a bet.");
      return;
    }

    if (!outcome || !selectedMarketId) {
      toast.error("Please select an outcome and market.");
      return;
    }

    const betData = {
      match: match.id,
      betType: selectedMarketId,
      selectedOutcome: outcome,
      stakeAmount: Number(stake),
      creatorOdds: Number(odds),
    };

    try {
      // Validate with zod
      createBetSchema.parse(betData);

      const response = await createBet(betData).unwrap();
      
      if (response.success || response.data) {
        setStep("CONFIRMATION");
      } else {
        toast.error("Failed to create bet");
      }
    } catch (error: any) {
      console.error("Bet creation error:", error);
      if (error?.name === "ZodError") {
        toast.error(error.errors[0]?.message || "Validation Error");
      } else {
        const errorMsg = error?.data?.message || error?.message || "Failed to create bet";
        toast.error(errorMsg);
      }
    }
  };

  const sportName = match.sport;
  const marketOutcomes = useMemo(() => {
    if (passedMarketOutcomes && passedMarketOutcomes.length > 0) {
      return passedMarketOutcomes;
    }
    // Only pass the required fields to satisfy the interface without 'any'
    return getBetOutcomesByMarket(sportName, {
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    });
  }, [match, sportName, passedMarketOutcomes]);

  const handleOutcomeSelect = (
    selectedOutcomeLabel: string,
    selectedMarket: string,
    marketId: string,
  ) => {
    setOutcome(selectedOutcomeLabel);
    setSelectedMarketName(selectedMarket);
    setSelectedMarketId(marketId);
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
              isProcessing={isCreating}
              onBack={() => setStep("SELECT_OUTCOME")}
              onConfirm={handleCreate}
              showBackButton={!selectedOutcome}
              userBalance={wallet?.totalBalance || 0}
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
