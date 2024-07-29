import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IconUser, 
  IconFriends, 
  IconActivity, 
  IconTrendingUp 
} from '@tabler/icons-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-4 border-r border-gray-300 shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Social</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
              <IconUser size={20} className="mr-3" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/friends" className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
              <IconFriends size={20} className="mr-3" />
              <span>Friends</span>
            </Link>
          </li>
          <li>
            <Link to="/activity" className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
              <IconActivity size={20} className="mr-3" />
              <span>Activity</span>
            </Link>
          </li>
          <li>
            <Link to="/trending" className="flex items-center text-gray-600 hover:text-blue-600 transition duration-300">
              <IconTrendingUp size={20} className="mr-3" />
              <span>Trending</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Feed */}
      <main className="w-full md:w-3/5 p-6">
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">What's on your mind?</h2>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your thoughts..."
          ></textarea>
          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Post
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="flex items-start space-x-4 mb-4">
              <img src="https://via.placeholder.com/50" alt="User Avatar" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">User Name</h3>
                <p className="text-gray-700 mt-2">This is a sample post content. It could be anything the user wants to share with their network.</p>
              </div>
            </div>
            {/* More posts */}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-4 border-l border-gray-300 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Friend Suggestions</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img src="https://via.placeholder.com/50" alt="Suggested Friend" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">Suggested Friend</h3>
              <p className="text-gray-600">User Name</p>
              <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                Add Friend
              </button>
            </div>
          </div>
          {/* More suggestions */}
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
