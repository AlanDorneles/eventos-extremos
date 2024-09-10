// src/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ajuste o caminho conforme necessário

interface ProtectedRouteProps {
  element: JSX.Element ;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('authToken');
  console.log(isAuthenticated)
  
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

