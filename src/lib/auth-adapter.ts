
// Auth adapter - abstracts authentication implementation
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  username?: string;
  full_name?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export class AuthAdapter {
  static async signIn({ email, password }: SignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(`Sign in failed: ${error.message}`);
    return this.transformSession(data);
  }

  static async signUp({ email, password, username, full_name }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name,
        },
      },
    });

    if (error) throw new Error(`Sign up failed: ${error.message}`);
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Sign out failed: ${error.message}`);
  }

  static async getCurrentSession(): Promise<AuthSession | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw new Error(`Get session failed: ${error.message}`);
    
    return session ? this.transformSession(session) : null;
  }

  static onAuthStateChange(callback: (session: AuthSession | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session ? this.transformSession(session) : null);
    });
  }

  private static transformSession(session: Session): AuthSession {
    return {
      user: this.transformUser(session.user),
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
    };
  }

  private static transformUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email || '',
      username: user.user_metadata?.username,
      full_name: user.user_metadata?.full_name,
      avatar_url: user.user_metadata?.avatar_url,
      metadata: user.user_metadata,
    };
  }
}
