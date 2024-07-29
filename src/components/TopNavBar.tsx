import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  IconHome, 
  IconUser, 
  IconSettings, 
  IconLogout, 
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
        <Link to="/feed" className="text-3xl font-bold flex items-center space-x-2 hover:text-gray-200 transition">
          <IconHome size={32} />
          <span>MyApp</span>
        </Link>
        <div className="relative">
          {isAuthenticated && username && (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 text-sm hover:bg-blue-600 rounded"
            >
              <IconUserCircle size={24} />
              <span>{username}</span>
              <IconChevronDown size={16} />
            </button>
          )}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <IconLogout size={16} className="inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
