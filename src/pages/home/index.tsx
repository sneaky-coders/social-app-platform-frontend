import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IconHeart, IconShare, IconMessage, IconFilter, IconSearch } from '@tabler/icons-react';

interface Feed {
  id: number;
  user: string;
  userImage: string;
  title: string;
  content: string;
  image: string;
  time: string;
  category: string;
}

const HomePage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Sample data for testing
  const sampleFeeds: Feed[] = [
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
  const searchedFeeds = filteredFeeds.filter(feed => feed.title.toLowerCase().includes(search.toLowerCase()));

  if (!isAuthenticated) {
    return <div className="text-center mt-4">Please log in to view this page.</div>;
  }

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-gradient-to-b from-indigo-500 to-indigo-700 text-white p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
            className="w-16 h-16 rounded-full border-4 border-white mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-sm">Your profile</p>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-4">
            <li
              className={`p-4 rounded-lg cursor-pointer ${filter === 'Tech' ? 'bg-indigo-800' : 'bg-indigo-700'} hover:bg-indigo-600 transition-colors`}
              onClick={() => setFilter('Tech')}
            >
              Tech Innovations
            </li>
            <li
              className={`p-4 rounded-lg cursor-pointer ${filter === 'AI' ? 'bg-indigo-800' : 'bg-indigo-700'} hover:bg-indigo-600 transition-colors`}
              onClick={() => setFilter('AI')}
            >
              AI Advancements
            </li>
            <li
              className={`p-4 rounded-lg cursor-pointer ${filter === 'Cybersecurity' ? 'bg-indigo-800' : 'bg-indigo-700'} hover:bg-indigo-600 transition-colors`}
              onClick={() => setFilter('Cybersecurity')}
            >
              Cybersecurity
            </li>
            <li
              className={`p-4 rounded-lg cursor-pointer ${filter === 'All' ? 'bg-indigo-800' : 'bg-indigo-700'} hover:bg-indigo-600 transition-colors`}
              onClick={() => setFilter('All')}
            >
              All
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <header className="flex flex-col lg:flex-row items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Feed</h2>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconSearch size={20} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              className="flex items-center bg-indigo-600 py-2 px-4 rounded-lg text-white hover:bg-indigo-700 transition-colors"
              onClick={() => setFilter(filter === 'All' ? 'Tech' : 'All')}
            >
              <IconFilter size={20} />
              <span className="ml-2">{filter === 'All' ? 'Filter by Tech' : 'Show All'}</span>
            </button>
          </div>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="What's on your mind?"
          />
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-3 hover:bg-indigo-700 transition-colors">
            Post
          </button>
        </div>

        {searchedFeeds.map(feed => (
          <div key={feed.id} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src={feed.userImage} alt={feed.user} className="w-12 h-12 object-cover rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{feed.user}</h3>
                <p className="text-gray-500 text-sm">{feed.time}</p>
              </div>
            </div>
            <img src={feed.image} alt={feed.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feed.title}</h3>
            <p className="text-gray-700 mb-4">{feed.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center hover:text-indigo-600 transition-colors">
                <IconHeart size={20} />
                <span className="ml-2">Like</span>
              </button>
              <button className="flex items-center hover:text-indigo-600 transition-colors">
                <IconMessage size={20} />
                <span className="ml-2">Comment</span>
              </button>
              <button className="flex items-center hover:text-indigo-600 transition-colors">
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
