import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  IconHome, 
  IconUser, 
  IconSettings, 
  IconLogout, 
  IconDashboard, 
  IconUserCircle, 
  IconChevronDown 
} from '@tabler/icons-react';

interface TopNavBarProps {
  username: string | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ username, isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsDropdownOpen(false); // Close the dropdown before logging out
    onLogout();
    navigate('/login'); // Redirect to login page
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
          <Link to="/feed" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconDashboard size={28} />
            <span className="hidden md:inline">Feed</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconUser size={28} />
            <span className="hidden md:inline">Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-full transition">
            <IconSettings size={28} />
            <span className="hidden md:inline">Settings</span>
          </Link>
        </div>

        {/* Right Side: Notifications and User Info */}
        <div className="flex items-center space-x-4 relative">
          {isAuthenticated ? (
            <div className="relative flex items-center space-x-2">
              <span className="text-white font-semibold hidden md:inline">{username}</span>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-white hover:text-gray-200 transition focus:outline-none"
                >
                  <IconUserCircle size={32} />
                  <IconChevronDown size={24} className="ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-10 w-48">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-t-lg flex items-center"
                    >
                      <IconLogout size={20} className="mr-2 inline" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-200 transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
