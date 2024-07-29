import React from 'react';
import { IconShare, IconMessage, IconHeart } from '@tabler/icons-react';

interface Post {
  id: number;
  username: string;
  avatar: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    username: 'tech_guru',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Just released a new feature in our app! 🚀 Check it out!',
    image: 'https://images.unsplash.com/photo-1542744173-8853edb0732e?fit=crop&w=800&h=600',
    likes: 150,
    comments: 42
  },
  {
    id: 2,
    username: 'dev_enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Learning some advanced React patterns today. Excited for the possibilities! 🧩',
    image: 'https://images.unsplash.com/photo-1506748686214e9df14f1a1c1d4d5d57?fit=crop&w=800&h=600',
    likes: 97,
    comments: 28
  },
  {
    id: 3,
    username: 'cyber_savvy',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'Exploring new cybersecurity techniques to secure our systems. 🔐',
    image: 'https://images.unsplash.com/photo-1564518090-d9fd83fd1462?fit=crop&w=800&h=600',
    likes: 124,
    comments: 31
  }
];

const FeedPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tech Feed</h1>
      <div className="space-y-6">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <img src={post.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{post.username}</h2>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <img src={post.image} alt="Post" className="w-full h-auto rounded-lg mb-4" />
            <div className="flex items-center justify-between mb-4 text-gray-600">
              <span className="flex items-center">
                <span className="font-semibold mr-2">{post.likes}</span> Likes
              </span>
              <span className="flex items-center">
                <span className="font-semibold mr-2">{post.comments}</span> Comments
              </span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <button className="flex items-center hover:text-red-500 transition">
                <IconHeart size={20} className="mr-2" /> Like
              </button>
              <button className="flex items-center hover:text-blue-500 transition">
                <IconShare size={20} className="mr-2" /> Share
              </button>
              <button className="flex items-center hover:text-blue-500 transition">
                <IconMessage size={20} className="mr-2" /> Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
