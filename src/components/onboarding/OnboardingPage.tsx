
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingWorkflow, { OnboardingData } from './OnboardingWorkflow';
import { useToast } from "@/hooks/use-toast";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding completed with data:', data);
    
    // Here you would typically save the data to your backend/database
    // For now, we'll just show a success message and redirect
    
    toast({
      title: "Welcome to emBrace! 🎉",
      description: "Your profile has been set up successfully. Let's start your journey!",
      duration: 3000,
    });

    // Redirect to the main app after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return <OnboardingWorkflow onComplete={handleOnboardingComplete} />;
};

export default OnboardingPage;
