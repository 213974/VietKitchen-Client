// src/contexts/auth-context.ts
import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

// Define the shape of our context value
export interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

// Create and export the context object itself
export const AuthContext = createContext<AuthContextType | undefined>(undefined);