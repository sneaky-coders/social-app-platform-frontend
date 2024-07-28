// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './pages/register/index';
import LoginScreen from './pages/login';
import Dashboard from './pages/dashboard';
import HomePage from './pages/home/index';
import UserProfile from './pages/profile/index'; // Import the UserProfile component
import Settings from './pages/settings/index'; // Import the UserProfile component
import User from './pages/user/index'; // Import the UserProfile component
import { AuthProvider, useAuth } from './context/AuthContext';
import TopNavBar from './components/TopNavBar';

const App: React.FC = () => {
  const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
      <div className="flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
