
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SignInForm, SignInFormValues } from "@/components/auth/SignInForm";
import { SignUpForm, SignUpFormValues } from "@/components/auth/SignUpForm";
import { StatusAlerts } from "@/components/auth/StatusAlerts";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [dbSuccess, setDbSuccess] = useState<string | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleSignIn = async (values: SignInFormValues) => {
    setDbError(null);
    setDbSuccess(null);
    try {
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      toast({
        title: "Sign in successful",
        description: "Hey there 👋 Welcome to emBrace 💙\nWe're so glad you're here — a community where support and healing come first 🌱\n\nBy signing in, you agree to our community values:\n✨ Stay engaged\n❤️ Do no harm\n🤝 Care and respect for others\n🔐 Protect privacy\n🧠 Use technology wisely\n\nLet's grow together! You're never alone here 💫🤗",
        action: <Button onClick={() => document.querySelector('[toast-close]')?.dispatchEvent(new MouseEvent('click'))}>OK</Button>,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof Error) {
        setDbError(error.message);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setDbError("An unknown error occurred during sign in.");
        toast({
          title: "Sign in failed",
          description: "An unknown error occurred during sign in.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (values: SignUpFormValues) => {
    setDbError(null);
    setDbSuccess(null);
    try {
      setIsSubmitting(true);
      await signUp(values.email, values.password, values.username);
      setDbSuccess("Account created successfully! You can now sign in.");
      setActiveTab("signin");
      toast({
        title: "Account created",
        description: "Please sign in with your new account.",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      if (error instanceof Error) {
        setDbError(error.message);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setDbError("An unknown error occurred during sign up.");
        toast({
          title: "Sign up failed",
          description: "An unknown error occurred during sign up.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center mb-8">
        <img 
          src="/assets/branding/emBrace_logo_black.png" 
          alt="emBrace Logo" 
          className="h-16 md:h-20 mb-2 dark:invert"
        />
      </div>
      <Card className="w-full max-w-md shadow-lg border-opacity-50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusAlerts 
            dbError={dbError}
            dbSuccess={dbSuccess}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm 
                onSubmit={handleSignIn}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm
                onSubmit={handleSignUp}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
