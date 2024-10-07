import { User } from "./User";

export interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    token: string | null;
    user: User | null;
  }