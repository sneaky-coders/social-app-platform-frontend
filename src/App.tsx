import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/Homepage';
import ProfilePage from './components/Profile';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import SettingsPage from './components/Setting';
import FriendsPage from './components/Friends';
import FollowersPage from './components/Follower';
import ChatWidget from './components/ChatWidget'; // Import the ChatWidget
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Assuming userId can be derived from username or another method
  const userId = username ? username : ''; // Replace this logic with your actual user ID retrieval

  const handleLogin = (user: string) => {
    console.log('Logging in user:', user); // Debugging statement
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logging out'); // Debugging statement
    setUsername(null);
    setIsAuthenticated(false);
    // Here you might also want to clear tokens or call an API to end the session
  };

  return (
    <Router>
      {/* Only show TopNavBar if authenticated */}
      {isAuthenticated && <TopNavBar username={username} isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/homepage" /> : <Navigate to="/login" />} />
        <Route path="/homepage" element={isAuthenticated ? <HomePage username={username} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage username={username} /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/friends" element={isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />} />
        <Route path="/followers" element={isAuthenticated ? <FollowersPage /> : <Navigate to="/login" />} />
        <Route path="/posts" element={isAuthenticated ? <PostForm /> : <Navigate to="/login" />} />
        <Route path="/postlist" element={isAuthenticated ? <PostList /> : <Navigate to="/login" />} />

        {/* Redirect any undefined routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/homepage" : "/login"} />} />
      </Routes>
      {isAuthenticated && <ChatWidget userId={userId} />} {/* Show ChatWidget if authenticated */}
    </Router>
  );
};

export default App;
