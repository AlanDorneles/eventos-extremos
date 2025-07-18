import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { AuthContextProps} from '../interfaces/AuthContexts';
import { User } from '../interfaces/User';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('authToken'));
  const [tokenAuth, setTokenAuth] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser'); 
    if (token && storedUser) {
      setIsAuthenticated(true);
      setTokenAuth(token);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: User) => {
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

  const enterSemLogin = () => {
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout, token: tokenAuth, enterSemLogin }}>
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
