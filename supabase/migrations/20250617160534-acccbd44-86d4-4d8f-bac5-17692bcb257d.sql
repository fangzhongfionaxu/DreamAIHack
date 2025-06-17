
-- Create a table to store user onboarding data
CREATE TABLE public.user_onboarding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_type TEXT CHECK (user_type IN ('patient', 'other')),
  motivations TEXT[], -- Array of motivation strings
  curve_degree TEXT,
  current_bracing_hours TEXT,
  bracing_goal INTEGER,
  consents_to_terms BOOLEAN DEFAULT false,
  age_range TEXT,
  gender TEXT,
  interests TEXT[], -- Array of interest strings
  discovery_method TEXT,
  other_discovery_method TEXT,
  interest_reason TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own onboarding data
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own onboarding data
CREATE POLICY "Users can view their own onboarding data" 
  ON public.user_onboarding 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own onboarding data
CREATE POLICY "Users can create their own onboarding data" 
  ON public.user_onboarding 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own onboarding data
CREATE POLICY "Users can update their own onboarding data" 
  ON public.user_onboarding 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_onboarding_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_onboarding_updated_at_trigger
  BEFORE UPDATE ON public.user_onboarding
  FOR EACH ROW
  EXECUTE FUNCTION update_user_onboarding_updated_at();
