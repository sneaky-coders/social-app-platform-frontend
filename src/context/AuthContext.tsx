// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  email?: string;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const login = ( email: string) => {
    localStorage.setItem('email', email); // Store email in localStorage
    setIsAuthenticated(true);
    setEmail(email); // Store email in state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Remove email from localStorage
    setIsAuthenticated(false);
    setEmail(undefined); // Clear email in state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
