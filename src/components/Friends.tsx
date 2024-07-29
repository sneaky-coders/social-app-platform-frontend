import React from 'react';
import { Link } from 'react-router-dom';
import { IconUser } from '@tabler/icons-react';

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

const friendsData: Friend[] = [
  { id: 1, name: 'Alice Johnson', avatar: 'https://via.placeholder.com/100/FFB6C1/000000?text=A' },
  { id: 2, name: 'Bob Smith', avatar: 'https://via.placeholder.com/100/ADD8E6/000000?text=B' },
  { id: 3, name: 'Charlie Brown', avatar: 'https://via.placeholder.com/100/98FB98/000000?text=C' },
  // Add more friends here
];

const FriendsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Friends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {friendsData.map(friend => (
          <div key={friend.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 transition">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{friend.name}</h2>
              <Link to={`/profile/${friend.id}`} className="text-blue-500 hover:underline">View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
