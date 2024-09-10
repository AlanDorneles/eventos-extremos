import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, user: object) => void;
  logout: () => void;
  token: string | null;
  user: object | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tokenAuth, setTokenAuth] = useState<string | null>(null);
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser'); 
    if (token && storedUser) {
      setIsAuthenticated(true);
      setTokenAuth(token);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: object) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    setTokenAuth(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser'); 
    setTokenAuth(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout, token: tokenAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
