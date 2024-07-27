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
  IconBellRinging,
  IconHeart,
  IconShare,
  IconComments,
  IconChartBar
} from '@tabler/icons-react';

// Define chart data type
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; lastSeen: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Array<{ id: number; content: string; likes: number; comments: number }>>([]);
  const [newPost, setNewPost] = useState('');
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);
  const [friendRequests, setFriendRequests] = useState<Array<{ id: number; username: string }>>([]);
  const [analytics, setAnalytics] = useState<{ totalPosts: number; totalLikes: number; totalComments: number } | null>(null);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Posts Over Time',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Likes Over Time',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data) {
          setUser(response.data);
        } else {
          setError('No user data found.');
        }
      } catch (error) {
        setError('Error fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setPosts(response.data);

          const dates = response.data.map(post => new Date(post.createdAt).toLocaleDateString());
          const likes = response.data.map(post => post.likes);
          const postCounts = response.data.map(() => 1); // Example counts

          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'Posts Over Time',
                data: postCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Likes Over Time',
                data: likes,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }
            ]
          });
        } else {
          console.error('Invalid posts data format');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error('Invalid notifications data format');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/friend-requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setFriendRequests(response.data);
        } else {
          console.error('Invalid friend requests data format');
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/api/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200 && response.data) {
          setAnalytics(response.data);
        } else {
          console.error('Invalid analytics data format');
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchUserData();
    fetchPosts();
    fetchNotifications();
    fetchFriendRequests();
    fetchAnalyticsData();
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
      const response = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 200 && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('Invalid posts data format');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

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
            <p className="text-gray-500 mt-2">Last seen: {user?.lastSeen || 'Loading...'}</p>
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

        {/* Main Feed */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">News Feed</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4 border border-gray-200">
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
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mb-4 border border-gray-200">
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex justify-between items-center text-gray-600">
                <div className="flex space-x-2">
                  <button className="text-red-500 hover:text-red-700 flex items-center">
                    <IconHeart size={16} /> <span className="ml-1">{post.likes}</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 flex items-center">
                    <IconComments size={16} /> <span className="ml-1">{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-gray-700 flex items-center">
                  <IconShare size={16} /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-lg p-6 border-l border-gray-200">
          {/* Notifications */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <IconBellRinging size={24} className="mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-600">No notifications yet.</p>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} className="bg-gray-200 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">{notification.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Friend Requests */}
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 flex items-center">
            <IconUsers size={24} className="mr-2" />
            Friend Requests
          </h2>
          <div className="space-y-4">
            {friendRequests.length === 0 ? (
              <p className="text-gray-600">No friend requests.</p>
            ) : (
              friendRequests.map(request => (
                <div key={request.id} className="bg-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center">
                  <p className="text-gray-700">{request.username}</p>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600">Accept</button>
                </div>
              ))
            )}
          </div>

          {/* Analytics */}
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 flex items-center">
            <IconChartBar size={24} className="mr-2" />
            Analytics
          </h2>
          <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">Total Posts: {analytics?.totalPosts || 'Loading...'}</p>
            <p className="text-gray-700">Total Likes: {analytics?.totalLikes || 'Loading...'}</p>
            <p className="text-gray-700">Total Comments: {analytics?.totalComments || 'Loading...'}</p>
          </div>

          {/* Charts */}
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 flex items-center">
            <IconChartBar size={24} className="mr-2" />
            Charts
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-xl font-semibold mb-2">Posts and Likes Over Time</h3>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
