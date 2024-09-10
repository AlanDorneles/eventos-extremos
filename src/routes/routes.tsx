// src/routes/Root.tsx
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import HubLogin from '../pages/HubLogin';
import ProtectedRoute from '../auth/authentication';

export const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<HubLogin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
        <Route
          path="/produtos/radar"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
        <Route
          path="/produtos/satelite"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
        <Route
          path="/produtos/estacoes"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
        <Route
          path="/boletins"
          element={
            <ProtectedRoute element={<Home />} />
          }
        />
        <Route
          path="/windy"
          element={
            <ProtectedRoute element={<Home />} />
          }
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
