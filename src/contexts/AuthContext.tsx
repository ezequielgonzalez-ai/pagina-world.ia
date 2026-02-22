"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: "google" | "github" | "twitter") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "worldia_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // First try to get user from API (server session)
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            // Also save to localStorage as backup
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
            setIsLoading(false);
            return;
          }
        }
        
        // Fallback: check localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
            } catch {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        // Fallback to localStorage on error
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setUser(data.user);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
        return { success: true };
      }

      return { success: false, error: data.error || "Login failed" };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setUser(data.user);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
        return { success: true };
      }

      return { success: false, error: data.error || "Registration failed" };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  const loginWithOAuth = useCallback((provider: "google" | "github" | "twitter") => {
    // For demo purposes, we'll simulate OAuth
    // In production, this would redirect to the OAuth provider
    const mockUser: User = {
      id: `oauth_${Date.now()}`,
      email: `user@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage for demo
    localStorage.setItem("worldia_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loginWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
