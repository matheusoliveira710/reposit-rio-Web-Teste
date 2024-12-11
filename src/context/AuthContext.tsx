import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      name: 'Test User',
      email,
    };
    
    setAuth({
      isAuthenticated: true,
      user: mockUser,
    });
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      name,
      email,
    };
    
    setAuth({
      isAuthenticated: true,
      user: mockUser,
    });
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};