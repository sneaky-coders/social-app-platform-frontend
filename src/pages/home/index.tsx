import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IconHeart, IconShare, IconMessage, IconFilter } from '@tabler/icons-react';

const HomePage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Sample data for testing
  const sampleFeeds = [
    {
      id: 1,
      user: 'John Doe',
      userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'Tech Innovations 2024',
      content: 'Discover the latest innovations in technology for 2024.',
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*90Y5ehQDkbnxVH2rl0HltQ.jpeg',
      time: '2 hours ago',
      category: 'Tech'
    },
    {
      id: 2,
      user: 'Jane Smith',
      userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      title: 'AI in Healthcare',
      content: 'How artificial intelligence is transforming the healthcare industry.',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*iHzg1qBy620EclFfK4nWNA.jpeg',
      time: '5 hours ago',
      category: 'AI'
    },
    {
      id: 3,
      user: 'Alice Johnson',
      userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      title: 'Cybersecurity Best Practices',
      content: 'Stay safe online with these top cybersecurity practices.',
      image: 'https://media.istockphoto.com/id/1420039900/photo/cyber-security-ransomware-email-phishing-encrypted-technology-digital-information-protected.jpg?s=612x612&w=0&k=20&c=8wFwFVMOpW9gF2GTOx0vagIKDaw3YNFnBVbYCmoTUSY=',
      time: '1 day ago',
      category: 'Cybersecurity'
    },
  ];

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // Simulating data fetch
        setFeeds(sampleFeeds);
      } catch (error) {
        setError('Error fetching feeds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  const filteredFeeds = filter === 'All' ? feeds : feeds.filter(feed => feed.category === filter);

  if (!isAuthenticated) {
    return <div className="text-center mt-4">Please log in to view this page.</div>;
  }

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-1 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg p-4 border-r border-gray-200 hidden lg:block">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Trending Topics</h2>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">Tech Innovations</li>
          <li className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">AI Advancements</li>
          <li className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">Cybersecurity</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Feed</h2>
          <div className="flex items-center space-x-4">
      
            <button
              className="flex items-center bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => setFilter(filter === 'All' ? 'Tech' : 'All')}
            >
              <IconFilter size={20} />
              <span className="ml-2">{filter === 'All' ? 'Filter by Tech' : 'Show All'}</span>
            </button>
          </div>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="What's on your mind?"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-3 hover:bg-blue-700 transition-colors">
            Post
          </button>
        </div>

        {filteredFeeds.map(feed => (
          <div key={feed.id} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <img src={feed.userImage} alt={feed.user} className="w-12 h-12 object-cover rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{feed.user}</h3>
                <p className="text-gray-500 text-sm">{feed.time}</p>
              </div>
            </div>
            <img src={feed.image} alt={feed.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{feed.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center hover:text-blue-600 transition-colors">
                <IconHeart size={20} />
                <span className="ml-2">Like</span>
              </button>
              <button className="flex items-center hover:text-blue-600 transition-colors">
                <IconMessage size={20} />
                <span className="ml-2">Comment</span>
              </button>
              <button className="flex items-center hover:text-blue-600 transition-colors">
                <IconShare size={20} />
                <span className="ml-2">Share</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
