import React, { useState, useMemo } from 'react';
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
  const [data, setData] = useState<Partial<OnboardingData>>({
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

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const patientSteps = useMemo(() => [
    { component: MotivationStep, props: { value: data.motivations, onChange: (value: string[]) => updateData('motivations', value) } },
    { component: CurrentProgressStep, props: { data: { curveDegree: data.curveDegree, currentBracingHours: data.currentBracingHours }, onChange: (field: 'curveDegree' | 'currentBracingHours', value: string) => updateData(field, value) } },
    { component: GoalStep, props: { value: data.bracingGoal, onChange: (value: number) => updateData('bracingGoal', value) } },
    { component: PermissionsStep, props: { value: data.consentsToTerms, onChange: (value: boolean) => updateData('consentsToTerms', value) } },
    { component: WelcomePatientStep, props: {} },
    { component: OptionalSurveyStep, props: { data, onChange: updateData, onSkip: () => handleComplete() } },
  ], [data]);

  const otherSteps = useMemo(() => [
    { component: OtherUserSurveyStep, props: { data, onChange: updateData } },
    { component: ThankYouStep, props: {} },
  ], [data]);

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

  const handleComplete = () => {
    onComplete(data);
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
    if (stepIndex < steps.length) {
      const StepComponent = steps[stepIndex].component;
      return <StepComponent {...steps[stepIndex].props} />;
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
