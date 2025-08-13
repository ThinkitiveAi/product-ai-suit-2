import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { authService } from "../services/authService";
import type { User } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuth = () => {
    const token = authService.getStoredToken();
    const storedUser = authService.getStoredUser();

    if (token && storedUser && authService.isTokenValid(token)) {
      setUser(storedUser);
    } else {
      // Clear invalid data
      authService.logout();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      authService.storeAuthData(response.user, response.token);
      setUser(response.user);

      notifications.show({
        title: "Welcome back!",
        message: "Successfully logged in to your patient portal.",
        color: "green",
        icon: "✓",
      });

      return true;
    } catch {
      notifications.show({
        title: "Login failed",
        message: "Please check your email and password and try again.",
        color: "red",
        icon: "✗",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);

    notifications.show({
      title: "Logged out",
      message: "You have been successfully logged out.",
      color: "blue",
      icon: "ℹ",
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
