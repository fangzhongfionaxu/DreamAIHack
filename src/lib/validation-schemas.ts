
// Centralized validation schemas using Zod
import { z } from "zod";

// Onboarding schemas
export const motivationSchema = z.object({
  motivations: z.array(z.string()).min(1, "Please select at least one motivation"),
});

export const currentProgressSchema = z.object({
  curveDegree: z.string().min(1, "Please select your curve degree"),
  currentBracingHours: z.string().min(1, "Please select your current bracing hours"),
});

export const goalSchema = z.object({
  bracingGoal: z.number().min(1).max(24),
});

export const permissionsSchema = z.object({
  consentsToTerms: z.boolean().refine(val => val === true, {
    message: "You must consent to terms to continue",
  }),
});

export const optionalSurveySchema = z.object({
  ageRange: z.string().optional(),
  gender: z.string().optional(),
  interests: z.array(z.string()).optional(),
  discoveryMethod: z.string().optional(),
});

export const otherUserSurveySchema = z.object({
  otherDiscoveryMethod: z.string().min(1, "Please tell us how you heard about us"),
  interestReason: z.string().min(1, "Please tell us why you're interested"),
});

// Profile schemas
export const profileUpdateSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").optional(),
  full_name: z.string().min(2, "Full name must be at least 2 characters").optional(),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(2, "Username must be at least 2 characters").optional(),
  full_name: z.string().min(2, "Full name must be at least 2 characters").optional(),
});
