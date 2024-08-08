import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconEdit, IconPlus, IconHeart, IconMessage } from '@tabler/icons-react';
import Logo from '../../public/saibha.jpeg';

interface Post {
  id: number;
  content: string;
  image: string | null;
  createdAt: string;
}

interface Profile {
  username: string;
  email: string;
  posts: Post[];
  followersCount: number;
  followingCount: number;
  friends: Array<{ id: number; name: string; avatar: string }>;
}

const ProfilePage: React.FC<{ username: string | null }> = ({ username }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!username) {
        setError('User is not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          params: { username },
          withCredentials: true
        });
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!profile) return <div className="text-center text-gray-500">No profile data available</div>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Profile Header */}
      <div className="col-span-1 lg:col-span-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-48">
          <img
            src="https://images.unsplash.com/photo-1506748686214e9df14a1d0f1e6a0cbe78f028e4dd0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzAyMTB8MHwxfGFsbHwxfHx8fHx8fHwxNjg1NzE0NzE2&ixlib=rb-1.2.1&q=80&w=1080"
            alt="Cover"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
            <div className="relative">
              <img
                src={Logo}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-white text-indigo-500 p-2 rounded-full shadow-lg hover:bg-indigo-100 transition">
                <IconEdit size={20} />
              </button>
            </div>
            <h1 className="text-4xl font-bold mt-4">{profile.username}</h1>
            <p className="text-lg">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="col-span-1 lg:col-span-4 bg-white shadow-xl rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">{profile.posts.length}</h2>
          <p className="text-gray-600">Posts</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">{profile.followersCount}</h2>
          <p className="text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">{profile.followingCount}</h2>
          <p className="text-gray-600">Following</p>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="col-span-1 lg:col-span-3 bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Posts</h2>
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 flex items-center transition">
            <IconPlus size={16} className="mr-2" /> Add Post
          </button>
        </div>
        <div className="space-y-6">
          {profile.posts.length > 0 ? profile.posts.map(post => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
              <div className="flex items-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1600985357351-4e91c648807d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzAyMTB8MHwxfGFsbHwxfHx8fHx8fHwxNjg1NzE0NzE2&ixlib=rb-1.2.1&q=80&w=60"
                  alt="User"
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">{profile.username}</h3>
                  <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{post.content}</p>
              {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" className="w-full h-auto rounded-lg mb-3" />}
              <div className="flex space-x-4 text-gray-600">
                <button className="flex items-center hover:text-indigo-500 transition">
                  <IconHeart size={16} className="mr-1" /> Like
                </button>
                <button className="flex items-center hover:text-indigo-500 transition">
                  <IconMessage size={16} className="mr-1" /> Comment
                </button>
              </div>
            </div>
          )) : <p className="text-center text-gray-500">No posts available</p>}
        </div>
      </div>

      {/* Friends List */}
      <div className="col-span-1 lg:col-span-1 bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Friends</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {profile.friends.length > 0 ? profile.friends.map(friend => (
            <div key={friend.id} className="flex items-center space-x-2">
              <img
                src={friend.avatar}
                alt="Friend"
                className="w-16 h-16 rounded-full"
              />
              <p className="text-gray-800">{friend.name}</p>
            </div>
          )) : <p className="text-center text-gray-500">No friends available</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
