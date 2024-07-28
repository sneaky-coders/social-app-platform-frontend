// src/components/TopNavBar.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { IconHome, IconUser, IconSettings, IconLogout, IconDashboard, IconBell, IconUserCircle } from '@tabler/icons-react';

const TopNavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Home Link */}
        <Link to="/homepage" className="text-3xl font-bold flex items-center space-x-2 hover:text-gray-200 transition">
          <IconHome size={32} />
          <span className="hidden md:inline">Home</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconDashboard size={28} />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link to="/userprofile" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconUser size={28} />
            <span className="hidden md:inline">Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconSettings size={28} />
            <span className="hidden md:inline">Settings</span>
          </Link>
        </div>

        {/* Right Side: Notifications and User Avatar */}
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative flex items-center justify-center text-white hover:text-gray-200 transition">
            <IconBell size={28} />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </Link>
          <Link to="/user" className="flex items-center space-x-2 hover:text-gray-200 transition">
            <IconUserCircle size={32} />
            <span className="hidden md:inline">User</span>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full flex items-center space-x-2 transition"
          >
            <IconLogout size={24} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
