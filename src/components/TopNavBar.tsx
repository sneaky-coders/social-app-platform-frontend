// src/components/TopNavBar.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { IconHome, IconUser, IconSettings, IconLogout, IconDashboard } from '@tabler/icons-react';

const TopNavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Home Link */}
        <Link to="/homepage" className="text-2xl font-bold flex items-center space-x-2 hover:text-blue-400 transition">
          <IconHome size={28} />
          <span>Home</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-1 hover:bg-gray-700 p-2 rounded-lg transition">
            <IconDashboard size={24} />
            <span>Dashboard</span>
          </Link>
          <Link to="/userprofile" className="flex items-center space-x-1 hover:bg-gray-700 p-2 rounded-lg transition">
            <IconUser size={24} />
            <span>Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-1 hover:bg-gray-700 p-2 rounded-lg transition">
            <IconSettings size={24} />
            <span>Settings</span>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition"
        >
          <IconLogout size={24} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
