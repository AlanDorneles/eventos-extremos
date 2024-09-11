// src/auth/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ProtectedRouteProps } from "../interfaces/ProtectedRoutes";
import isTokenExpired from "./expiredToken";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, token, logout } = useAuth();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, logout]);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
