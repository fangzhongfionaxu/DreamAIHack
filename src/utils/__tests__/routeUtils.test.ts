import { hasCompletedOnboarding, getAppropriateRoute } from '../routeUtils';

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          maybeSingle: jest.fn()
        }))
      }))
    }))
  }
}));

describe('routeUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hasCompletedOnboarding', () => {
    it('should return true when user has completed onboarding', async () => {
      const mockOnboardingData = { id: '1', user_id: 'user123' };
      const { supabase } = require('@/integrations/supabase/client');
      
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({ data: mockOnboardingData })
          })
        })
      });

      const result = await hasCompletedOnboarding('user123');
      expect(result).toBe(true);
    });

    it('should return false when user has not completed onboarding', async () => {
      const { supabase } = require('@/integrations/supabase/client');
      
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({ data: null })
          })
        })
      });

      const result = await hasCompletedOnboarding('user123');
      expect(result).toBe(false);
    });
  });

  describe('getAppropriateRoute', () => {
    it('should return "/" when user has completed onboarding', async () => {
      const { supabase } = require('@/integrations/supabase/client');
      
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({ data: { id: '1' } })
          })
        })
      });

      const result = await getAppropriateRoute('user123');
      expect(result).toBe('/');
    });

    it('should return "/onboarding" when user has not completed onboarding', async () => {
      const { supabase } = require('@/integrations/supabase/client');
      
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({ data: null })
          })
        })
      });

      const result = await getAppropriateRoute('user123');
      expect(result).toBe('/onboarding');
    });
  });
}); 