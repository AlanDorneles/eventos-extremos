// src/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ajuste o caminho conforme necessário

interface ProtectedRouteProps {
  element: JSX.Element ;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, token } = useAuth();
  console.log(token)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};


export default ProtectedRoute;

