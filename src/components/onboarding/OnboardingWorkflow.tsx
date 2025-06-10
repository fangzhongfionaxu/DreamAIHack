
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import CurveStep from "./steps/CurveStep";
import BracingGoalStep from "./steps/BracingGoalStep";
import DiscoveryStep from "./steps/DiscoveryStep";
import InterestsStep from "./steps/InterestsStep";
import GenderStep from "./steps/GenderStep";
import AgeStep from "./steps/AgeStep";
import ConsentStep from "./steps/ConsentStep";
import WelcomeStep from "./steps/WelcomeStep";
import CelebrationStep from "./steps/CelebrationStep";
import { useToast } from "@/hooks/use-toast";

export interface OnboardingData {
  curvedegree: string;
  bracingGoal: string;
  discovery: string;
  interests: string[];
  gender: string;
  ageRange: string;
  consentsToTerms: boolean;
}

const OnboardingWorkflow = ({ onComplete }: { onComplete: (data: OnboardingData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    curvedegree: '',
    bracingGoal: '',
    discovery: '',
    interests: [],
    gender: '',
    ageRange: '',
    consentsToTerms: false,
  });
  const { toast } = useToast();

  const totalSteps = 9; // Now including welcome + 7 questions + celebration
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (currentStep === 7 && !data.consentsToTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 8) {
      // Final step - complete onboarding
      onComplete(data);
    } else {
      nextStep();
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 0: return true; // Welcome step
      case 1: return data.curvedegree !== '';
      case 2: return data.bracingGoal !== '';
      case 3: return data.discovery !== '';
      case 4: return data.interests.length > 0;
      case 5: return data.gender !== '';
      case 6: return data.ageRange !== '';
      case 7: return data.consentsToTerms;
      case 8: return true; // Celebration step
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return (
          <CurveStep
            value={data.curvedegree}
            onChange={(value) => updateData('curvedegree', value)}
          />
        );
      case 2:
        return (
          <BracingGoalStep
            value={data.bracingGoal}
            onChange={(value) => updateData('bracingGoal', value)}
          />
        );
      case 3:
        return (
          <DiscoveryStep
            value={data.discovery}
            onChange={(value) => updateData('discovery', value)}
          />
        );
      case 4:
        return (
          <InterestsStep
            value={data.interests}
            onChange={(value) => updateData('interests', value)}
          />
        );
      case 5:
        return (
          <GenderStep
            value={data.gender}
            onChange={(value) => updateData('gender', value)}
          />
        );
      case 6:
        return (
          <AgeStep
            value={data.ageRange}
            onChange={(value) => updateData('ageRange', value)}
          />
        );
      case 7:
        return (
          <ConsentStep
            value={data.consentsToTerms}
            onChange={(value) => updateData('consentsToTerms', value)}
          />
        );
      case 8:
        return <CelebrationStep />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 8) return 'START YOUR JOURNEY';
    if (currentStep === 7) return 'CONTINUE';
    return 'CONTINUE';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-800 flex flex-col">
      {/* Header with progress */}
      <div className="p-4 flex items-center gap-4">
        {currentStep > 0 && currentStep < 8 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={prevStep}
            className="text-gray-600 hover:bg-white/50"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <div className="flex-1">
          <Progress 
            value={progress} 
            className="h-2 bg-white/30"
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        {renderStep()}
      </div>

      {/* Continue button */}
      <div className="p-6">
        <Button
          onClick={handleComplete}
          disabled={!canContinue()}
          className="w-full h-14 text-lg font-semibold bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingWorkflow;
