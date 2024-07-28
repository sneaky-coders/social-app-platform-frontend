import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../../public/saibha.jpg';
import {
  IconHome,
  IconUser,
  IconMessageCircle,
  IconUsers,
  IconBell,
  IconSettings,
  IconPlus,
  IconTrendingUp,
  IconActivity
} from '@tabler/icons-react';

// Define new types
interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface TrendingTopic {
  id: number;
  topic: string;
  posts: number;
}

interface RecentActivity {
  id: number;
  activity: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(userResponse.data);

        // Fetch user stats
        const statsResponse = await axios.get('/api/users/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserStats(statsResponse.data);

        // Fetch trending topics
        const topicsResponse = await axios.get('/api/trending-topics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Log and set the trending topics
        console.log('Trending topics response:', topicsResponse.data);
        setTrendingTopics(Array.isArray(topicsResponse.data) ? topicsResponse.data : []);

        // Fetch recent activity
        const activityResponse = await axios.get('/api/recent-activity', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRecentActivity(activityResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      await axios.post('/api/posts', { content: newPost }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-lg p-6 border-r border-gray-200">
          <div className="text-center mb-6">
            <img 
              src={logo} 
              alt="User Profile" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-md transition-transform transform hover:scale-105" 
            />
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user?.username || 'Loading...'}</h2>
            <p className="text-gray-600">{user?.email || 'Loading...'}</p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconHome size={24} />
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconUser size={24} />
              <span>Profile</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconMessageCircle size={24} />
              <span>Messages</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconUsers size={24} />
              <span>Friends</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconBell size={24} />
              <span>Notifications</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded cursor-pointer transition duration-300">
              <IconSettings size={24} />
              <span>Settings</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4 border border-gray-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="What's on your mind?"
              value={newPost}
              onChange={handlePostChange}
            />
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handlePostSubmit}
            >
              <IconPlus size={16} /> Post
            </button>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Posts</h3>
              <p className="text-4xl font-bold text-gray-600">{userStats?.posts || 'Loading...'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Followers</h3>
              <p className="text-4xl font-bold text-gray-600">{userStats?.followers || 'Loading...'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Following</h3>
              <p className="text-4xl font-bold text-gray-600">{userStats?.following || 'Loading...'}</p>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <IconTrendingUp size={24} className="mr-2" />
              Trending Topics
            </h2>
            <ul className="space-y-4">
              {Array.isArray(trendingTopics) && trendingTopics.map(topic => (
                <li key={topic.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{topic.topic}</span>
                  <span className="text-gray-500">Posts: {topic.posts}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <IconActivity size={24} className="mr-2" />
              Recent Activity
            </h2>
            <ul className="space-y-4">
              {Array.isArray(recentActivity) && recentActivity.map(activity => (
                <li key={activity.id} className="text-gray-700">
                  {activity.activity} <span className="text-gray-500">({new Date(activity.timestamp).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
