
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

// Define type for user_logins table since it's not in the generated types
interface UserLogin {
  user_id: string;
  login_count: number;
  last_login: string;
}

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
      
      // Show welcome toast
      const { dismiss: dismissWelcome } = toast({
        title: "Sign in successful",
        description: "Hey there 👋 Welcome to emBrace 💙\nWe're so glad you're here — a community where support and healing come first 🌱\n\nBy signing in, you agree to our community values:\n✨ Stay engaged\n❤️ Do no harm\n🤝 Care and respect for others\n🔐 Protect privacy\n🧠 Use technology wisely\n\nLet's grow together! You're never alone here 💫🤗",
        action: <Button onClick={(e) => { 
          e.preventDefault();
          dismissWelcome();
        }}>OK</Button>,
      });
      
      // Check if this is a returning user
      const { data } = await supabase
        .from('user_logins')
        .select('login_count')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single() as { data: UserLogin | null };
      
      // If login count is greater than 1, show feedback request toast
      if (data && data.login_count > 1) {
        // Show after a short delay to ensure toasts don't overlap
        setTimeout(() => {
          toast({
            title: "💬 We'd Love Your Feedback!",
            description: "Help us make this app even better 💙\nTake 2 minutes to share your thoughts and you could win a $30 gift card! 🎁\n\nYour voice helps shape a more supportive, healing experience for everyone 🌱",
            action: <Button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSf6pokmMXJw31zakPOrJmm6CLNfs2bW1myNirN9zwZaaxADkw/viewform?usp=dialog", "_blank")}>
              Submit feedback now
            </Button>,
          });
        }, 1000);
      }
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
      // Note: The redirect to onboarding is now handled in the AuthContext
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
