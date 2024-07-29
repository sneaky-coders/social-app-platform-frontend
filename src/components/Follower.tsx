import React from 'react';
import { Link } from 'react-router-dom';
import { IconUser } from '@tabler/icons-react';

interface Follower {
  id: number;
  name: string;
  avatar: string;
}

const followersData: Follower[] = [
  { id: 1, name: 'David Lee', avatar: 'https://via.placeholder.com/100/FFD700/000000?text=D' },
  { id: 2, name: 'Emily Davis', avatar: 'https://via.placeholder.com/100/FF6347/000000?text=E' },
  { id: 3, name: 'Frank Wright', avatar: 'https://via.placeholder.com/100/00FA9A/000000?text=F' },
  // Add more followers here
];

const FollowersPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Followers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {followersData.map(follower => (
          <div key={follower.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 transition">
            <img
              src={follower.avatar}
              alt={follower.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{follower.name}</h2>
              <Link to={`/profile/${follower.id}`} className="text-blue-500 hover:underline">View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
