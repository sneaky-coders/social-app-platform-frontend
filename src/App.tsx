import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/Homepage';
import ProfilePage from './components/Profile';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import SettingsPage from './components/Setting'; // Import the SettingsPage component
import FeedPage from './components/Feed';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (user: string) => {
    console.log('Logging in user:', user); // Debugging statement
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logging out'); // Debugging statement
    setUsername(null);
    setIsAuthenticated(false);
    // Clear tokens or call API to end session here if necessary
  };

  return (
    <Router>
      {/* Conditionally render TopNavBar */}
      {isAuthenticated && <TopNavBar username={username} isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/homepage" /> : <Navigate to="/login" />} />
        <Route path="/homepage" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage username={username} /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/feed" element={<FeedPage />} />

        {/* Redirect any undefined routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/homepage" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
