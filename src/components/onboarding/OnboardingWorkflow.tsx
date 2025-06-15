import React, { useState, useMemo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import IdentityStep from "./steps/IdentityStep";
import MotivationStep from "./steps/MotivationStep";
import CurrentProgressStep from "./steps/CurrentProgressStep";
import GoalStep from "./steps/GoalStep";
import PermissionsStep from "./steps/PermissionsStep";
import WelcomePatientStep from "./steps/WelcomePatientStep";
import OptionalSurveyStep from "./steps/OptionalSurveyStep";
import OtherUserSurveyStep from "./steps/OtherUserSurveyStep";
import ThankYouStep from "./steps/ThankYouStep";

export interface OnboardingData {
  userType: 'patient' | 'other' | '';
  // Patient path
  motivations: string[];
  curveDegree: string;
  currentBracingHours: string;
  bracingGoal: number;
  consentsToTerms: boolean;
  // Optional survey for patient
  ageRange: string;
  gender: string;
  interests: string[];
  discoveryMethod: string;
  // Other path
  otherDiscoveryMethod: string;
  interestReason: string;
}

const OnboardingWorkflow = ({ onComplete }: { onComplete: (data: Partial<OnboardingData>) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    userType: '',
    motivations: [],
    curveDegree: '',
    currentBracingHours: '',
    bracingGoal: 12,
    consentsToTerms: false,
    ageRange: '',
    gender: '',
    interests: [],
    discoveryMethod: '',
    otherDiscoveryMethod: '',
    interestReason: '',
  });

  const { toast } = useToast();

  const updateData = useCallback((field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleComplete = useCallback(() => {
    onComplete(data);
  }, [onComplete, data]);

  const patientSteps = useMemo(() => [
    <MotivationStep value={data.motivations} onChange={(value) => updateData('motivations', value)} />,
    <CurrentProgressStep data={{ curveDegree: data.curveDegree, currentBracingHours: data.currentBracingHours }} onChange={(field, value) => updateData(field, value)} />,
    <GoalStep value={data.bracingGoal} onChange={(value) => updateData('bracingGoal', value)} />,
    <PermissionsStep value={data.consentsToTerms} onChange={(value) => updateData('consentsToTerms', value)} />,
    <WelcomePatientStep />,
    <OptionalSurveyStep data={data} onChange={updateData} onSkip={handleComplete} />,
  ], [data, updateData, handleComplete]);

  const otherSteps = useMemo(() => [
    <OtherUserSurveyStep data={data} onChange={updateData} />,
    <ThankYouStep />,
  ], [data, updateData]);

  const steps = data.userType === 'patient' ? patientSteps : data.userType === 'other' ? otherSteps : [];
  const totalSteps = (data.userType ? steps.length : 0) + 1;
  const progress = totalSteps > 1 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    nextStep();
  };

  const canContinue = () => {
    if (currentStep === 0) return !!data.userType;
    // Add validation for other steps later
    return true; 
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return <IdentityStep value={data.userType || ''} onChange={(value) => updateData('userType', value)} />;
    }

    const stepIndex = currentStep - 1;
    if (stepIndex >= 0 && stepIndex < steps.length) {
      return steps[stepIndex];
    }

    return null;
  };

  const getButtonText = () => {
    if (currentStep === totalSteps - 1) return 'FINISH';
    if (data.userType === 'patient' && currentStep === 6) return "START YOUR JOURNEY"; // Optional Survey
    return 'CONTINUE';
  };
  
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-800 flex flex-col">
      <div className="p-4 flex items-center gap-4">
        {currentStep > 0 && (
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
          {data.userType && <Progress value={progress} className="h-2 bg-white/30" />}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6">
        {renderStep()}
      </div>

      <div className="p-6">
        {data.userType && (
            <Button
              onClick={isLastStep ? handleComplete : handleContinue}
              disabled={!canContinue()}
              className="w-full h-14 text-lg font-semibold bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg"
            >
              {getButtonText()}
            </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingWorkflow;
