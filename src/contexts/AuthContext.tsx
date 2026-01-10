import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  mobile_number: string;
  preferred_language: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (mobileNumber: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('auth_user');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (mobileNumber: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Use secure RPC function for login
      const { data: profiles, error } = await supabase.rpc('get_profile_for_login', {
        mobile: mobileNumber,
        pwd: password
      });

      if (error) {
        return { success: false, error: 'Login failed' };
      }

      if (!profiles || profiles.length === 0) {
        return { success: false, error: 'Invalid credentials' };
      }

      const profile = profiles[0];
      const userData: User = {
        id: profile.id,
        mobile_number: profile.mobile_number,
        preferred_language: profile.preferred_language,
        username: profile.username ?? undefined,
      };

      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};