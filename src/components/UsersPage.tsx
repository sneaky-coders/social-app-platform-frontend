import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPage: React.FC = () => {
  const { username } = useParams<{ username: string }>(); // Get the username from URL params
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile?username=${username}`);
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p>Email: {user.email}</p>
          <div>
            <h2 className="text-xl font-semibold">Posts:</h2>
            <ul>
              {user.posts.map((post: any) => (
                <li key={post.id}>
                  <p>{post.content}</p>
                  <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Friends:</h2>
            <ul>
              {user.friends.map((friend: any) => (
                <li key={friend.id} className="flex items-center space-x-2">
                  <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                  <span>{friend.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default UserPage;
