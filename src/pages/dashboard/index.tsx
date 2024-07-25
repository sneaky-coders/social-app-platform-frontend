// src/pages/dashboard/index.tsx

import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold mb-4">User Posts</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-700">Post 1</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg mt-4">
              <p className="text-gray-700">Post 2</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Friends List</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-700">Friend 1</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg mt-4">
              <p className="text-gray-700">Friend 2</p>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-700">Notification 1</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg mt-4">
              <p className="text-gray-700">Notification 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
