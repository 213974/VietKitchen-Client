// src/contexts/AuthProvider.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { AuthContext } from './auth-context'; // Import from the new file
import type { Session, User } from '@supabase/supabase-js';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };
    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = { session, user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};