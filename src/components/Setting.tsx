import React, { useState } from 'react';
import { IconLock, IconShield, IconUser, IconBell, IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('privacy');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="col-span-1 bg-white shadow-xl rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleSectionChange('privacy')}
              className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition ${activeSection === 'privacy' ? 'bg-gray-200' : ''}`}
            >
              <IconLock size={20} className="mr-2" /> Privacy
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionChange('security')}
              className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition ${activeSection === 'security' ? 'bg-gray-200' : ''}`}
            >
              <IconShield size={20} className="mr-2" /> Security
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionChange('notifications')}
              className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition ${activeSection === 'notifications' ? 'bg-gray-200' : ''}`}
            >
              <IconBell size={20} className="mr-2" /> Notifications
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionChange('account')}
              className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition ${activeSection === 'account' ? 'bg-gray-200' : ''}`}
            >
              <IconUser size={20} className="mr-2" /> Account
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-3 bg-white shadow-xl rounded-lg p-6">
        {/* Conditional Rendering for Each Section */}
        {activeSection === 'privacy' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
            <form className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="privateAccount" className="mr-2" />
                <label htmlFor="privateAccount" className="text-gray-700">Private Account</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="blockMessages" className="mr-2" />
                <label htmlFor="blockMessages" className="text-gray-700">Block Messages from Non-Followers</label>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Save Privacy Settings
              </button>
            </form>
          </section>
        )}

        {activeSection === 'security' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Update Password
              </button>
            </form>
          </section>
        )}

        {activeSection === 'notifications' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
            <form className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="emailNotifications" className="mr-2" checked />
                <label htmlFor="emailNotifications" className="text-gray-700">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="pushNotifications" className="mr-2" checked />
                <label htmlFor="pushNotifications" className="text-gray-700">Push Notifications</label>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Save Notification Settings
              </button>
            </form>
          </section>
        )}

        {activeSection === 'account' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Update Account Info
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
