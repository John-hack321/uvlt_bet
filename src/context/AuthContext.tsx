"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../lib/api";

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  full_name?: string;
}

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        // Check if there's a token in localStorage
        if (!AuthService.isLoggedIn()) {
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userData = await AuthService.getProfile();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Authentication check failed:", err);
        // Clear token if it's invalid
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, status } = await AuthService.login(email, password);
      
      if (status === 200) {
        const userData = await AuthService.getProfile();
        setUser(userData);
        setIsLoggedIn(true);
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        setError(data.detail || "Failed to login. Please check your credentials.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.register(email, password, fullName);
      
      if (response.message) {
        router.push("/auth/login?registered=true");
      } else {
        setError(response.detail || "Failed to register. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
