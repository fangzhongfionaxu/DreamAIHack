
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface OnboardingData {
  id: string;
  user_id: string;
  user_type: string | null;
  motivations: string[] | null;
  curve_degree: string | null;
  current_bracing_hours: string | null;
  bracing_goal: number | null;
  consents_to_terms: boolean | null;
  age_range: string | null;
  gender: string | null;
  interests: string[] | null;
  discovery_method: string | null;
  other_discovery_method: string | null;
  interest_reason: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useOnboardingData = () => {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOnboardingData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: onboardingData, error } = await supabase
          .from('user_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching onboarding data:', error);
          setError(error.message);
        } else {
          setData(onboardingData);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, [user]);

  return { data, loading, error };
};
