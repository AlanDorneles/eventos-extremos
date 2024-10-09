// src/routes/Root.tsx
import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import HubLogin from '../pages/HubLogin';
import ProtectedRoute from '../auth/authentication';
import { useAuth } from '../contexts/AuthContext';

export const Root: React.FC = () => {
  const {isAuthenticated} = useAuth();
  //console.log('isAuthenticated:',isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={isAuthenticated ? <Navigate to='/'/> : <HubLogin />} />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/produtos/radar"
          element={<Home />}
        />
        <Route
          path="/produtos/satelite"
          element={<Home />}
        />
        <Route
          path="/produtos/estacoes"
          element={<Home />}
        />
        <Route
          path="/produtos/wrf"
          element={<Home />}
        />
        <Route
          path="/boletins"
          element={<Home />}
        />
        <Route
          path="/windy"
          element={<Home />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
