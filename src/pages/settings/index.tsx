// src/pages/Settings.tsx

import React from 'react';
import { IconUser, IconLock, IconBell, IconMoon, IconSun, IconDeviceFloppy } from '@tabler/icons-react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <IconUser size={24} className="text-gray-500 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-800">Profile</h3>
                <p className="text-gray-600">Update your profile information</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <IconLock size={24} className="text-gray-500 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-800">Security</h3>
                <p className="text-gray-600">Change your password and security settings</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <IconBell size={24} className="text-gray-500 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-800">Notifications</h3>
                <p className="text-gray-600">Manage your notification preferences</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <IconMoon size={24} className="text-gray-500 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-800">Theme</h3>
                <p className="text-gray-600">Choose your preferred theme</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <IconSun size={24} className="text-gray-500 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-800">Language</h3>
                <p className="text-gray-600">Select your preferred language</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">Edit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Save Changes</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition">
            <IconDeviceFloppy size={24} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
