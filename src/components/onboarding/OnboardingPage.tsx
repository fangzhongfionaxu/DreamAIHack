
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingWorkflow, { OnboardingData } from './OnboardingWorkflow';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleOnboardingComplete = async (data: OnboardingData) => {
    console.log('Onboarding completed with data:', data);
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to complete onboarding.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save onboarding data to the database
      const { error } = await supabase
        .from('user_onboarding')
        .insert({
          user_id: user.id,
          user_type: data.userType || null,
          motivations: data.motivations.length > 0 ? data.motivations : null,
          curve_degree: data.curveDegree || null,
          current_bracing_hours: data.currentBracingHours || null,
          bracing_goal: data.bracingGoal || null,
          consents_to_terms: data.consentsToTerms || null,
          age_range: data.ageRange || null,
          gender: data.gender || null,
          interests: data.interests && data.interests.length > 0 ? data.interests : null,
          discovery_method: data.discoveryMethod || null,
          other_discovery_method: data.otherDiscoveryMethod || null,
          interest_reason: data.interestReason || null,
        });

      if (error) {
        console.error('Error saving onboarding data:', error);
        toast({
          title: "Error saving data",
          description: "There was an issue saving your onboarding information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome to emBrace! 🎉",
        description: "Your profile has been set up successfully. Let's start your journey!",
        duration: 3000,
      });

      // Redirect to the main app
      navigate('/');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return <OnboardingWorkflow onComplete={handleOnboardingComplete} />;
};

export default OnboardingPage;
