import { supabase } from "@/integrations/supabase/client";

/**
 * Check if a user has completed onboarding
 * @param userId - The user's ID
 * @returns Promise<boolean> - True if onboarding is completed, false otherwise
 */
export const hasCompletedOnboarding = async (userId: string): Promise<boolean> => {
  try {
    const { data: onboardingData } = await supabase
      .from('user_onboarding')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    return !!onboardingData;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Get the appropriate route for a user based on their onboarding status
 * @param userId - The user's ID
 * @returns Promise<string> - The route the user should be on
 */
export const getAppropriateRoute = async (userId: string): Promise<string> => {
  const hasOnboarding = await hasCompletedOnboarding(userId);
  return hasOnboarding ? '/' : '/onboarding';
}; 