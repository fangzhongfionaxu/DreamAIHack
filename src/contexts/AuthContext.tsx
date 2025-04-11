
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Only synchronous state updates here
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Using setTimeout to avoid Supabase deadlocks
          setTimeout(() => {
            navigate('/');
            
            // Update login count
            if (session?.user) {
              updateLoginCount(session.user.id);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          // Using setTimeout to avoid Supabase deadlocks
          setTimeout(() => {
            navigate('/auth');
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Function to update login count
  const updateLoginCount = async (userId: string) => {
    try {
      // Check if user exists in table
      const { data: existingUser } = await supabase
        .from('user_logins')
        .select('login_count')
        .eq('user_id', userId)
        .single();
      
      if (existingUser) {
        // Increment login count
        await supabase
          .from('user_logins')
          .update({ 
            login_count: existingUser.login_count + 1,
            last_login: new Date()
          })
          .eq('user_id', userId);
      } else {
        // Create new record
        await supabase
          .from('user_logins')
          .insert([
            { 
              user_id: userId, 
              login_count: 1,
              last_login: new Date()
            }
          ]);
      }
    } catch (error) {
      console.error("Error updating login count:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      // Properly pass username to user_metadata to ensure it's available in the trigger function
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim(),  // Ensure username is trimmed
          },
        },
      });

      if (error) throw error;
      
      toast({
        title: "Account created successfully",
        description: "You can now sign in with your credentials.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
