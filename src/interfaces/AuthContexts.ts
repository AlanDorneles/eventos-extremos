export interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string, user: object) => void;
    logout: () => void;
    token: string | null;
    user: object | null;
  }