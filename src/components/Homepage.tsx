import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconUser,
  IconFriends,
  IconActivity,
  IconTrendingUp
} from '@tabler/icons-react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
}

interface Post {
  id: string;
  content: string;
  username: string;
}

interface HomePageProps {
  username: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
  const [suggestedFriends, setSuggestedFriends] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setSuggestedFriends(response.data);
      } catch (error) {
        setError('Error fetching users. Please try again later.');
        console.error('Error fetching users:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts. Please try again later.');
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestedFriends();
    fetchPosts();
  }, []);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = {
      content,
      // Username is not included; backend will handle it
    };

    try {
      await axios.post('http://localhost:5000/api/posts', postData);
      setContent(''); // Clear the content after successful submission
      setSuccessMessage('Post created successfully!');
      // Fetch posts again to include the new post
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      setError('Error creating post. Please try again later.');
      console.error('Error creating post:', error);
    }
  };

  const getAvatar = (username: string | undefined) => {
    if (!username) {
      return '?'; // Return a default character if username is undefined or empty
    }
    return username.charAt(0).toUpperCase(); // Return the first character of the username
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-4 border-r border-gray-300 shadow-md">
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
          <form onSubmit={handlePostSubmit}>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
              value={content}
              onChange={handleContentChange}
              required
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Post
            </button>
          </form>
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>

        <div className="space-y-6 mt-8">
          {isLoading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-semibold">
                    {getAvatar(post.username)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{post.username}</h3>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                  </div>
                </div>
                {/* More posts */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-4 border-l border-gray-300 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Friend Suggestions</h2>
        <div className="space-y-6">
          {suggestedFriends.length > 0 ? (
            suggestedFriends.map(user => (
              <div key={user.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-semibold">
                  {getAvatar(user.username)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
                  <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                    Add Friend
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No suggestions available</p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
