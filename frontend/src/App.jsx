import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TwoFactorSetup from './pages/TwoFactorSetup';
import TwoFactorVerify from './pages/TwoFactorVerify';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, checked } = useContext(AuthContext);

  if (!checked) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/2fa-verify" element={<TwoFactorVerify />} />

      {/* Protected Routes */}
      <Route
        path="/2fa-setup"
        element={user ? <TwoFactorSetup /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/dashboard/*"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
