import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconMessage2Bolt, IconChevronUp, IconX } from '@tabler/icons-react';

interface ChatWidgetProps {
  userId: string;
}

interface User {
  id: string;
  username: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ user: string; message: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggle = () => {
    if (!isOpen) setIsOpen(true);
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleSendMessage = async () => {
    if (selectedUser && message.trim()) {
      setChatHistory([...chatHistory, { user: selectedUser.username, message }]);
      setMessage('');
      try {
        await axios.post('http://localhost:5000/api/chat', { userId, recipientId: selectedUser.id, message });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const getAvatar = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  if (!isOpen) {
    return (
      <div
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full shadow-lg p-3 cursor-pointer hover:bg-indigo-700 transition"
      >
        <IconMessage2Bolt size={24} />
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white shadow-lg rounded-lg ${isMinimized ? 'w-16 h-16' : 'w-80 h-96'} flex flex-col transition-all border border-gray-300`}
    >
      <div className="relative flex items-center justify-end p-2 border-b border-gray-200">
        <button
          onClick={handleToggle}
          className="bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 transition"
        >
          {isMinimized ? <IconMessage2Bolt size={20} /> : <IconChevronUp size={20} />}
        </button>
        {!isMinimized && (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 transition"
          >
            <IconX size={20} />
          </button>
        )}
      </div>

      {!isMinimized && selectedUser && (
        <div className="bg-indigo-600 text-white p-3 rounded-t-lg flex items-center justify-between shadow-md">
          <span className="text-lg font-semibold">{selectedUser.username}</span>
        </div>
      )}

      {!isMinimized && !selectedUser && (
        <div className="flex-1 overflow-y-auto p-3">
          <ul>
            {users.length > 0 ? users.map(user => (
              <li
                key={user.id}
                className={`p-3 cursor-pointer rounded-lg flex items-center space-x-3 hover:bg-indigo-50 transition duration-200 ease-in-out `}
                onClick={() => setSelectedUser(user)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-semibold shadow-sm">
                  {getAvatar(user.username)}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
              </li>
            )) : <p className="text-center text-gray-500">No users available</p>}
          </ul>
        </div>
      )}

      {!isMinimized && selectedUser && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-2 border-t border-gray-200 bg-gray-50 rounded-lg mb-2 shadow-inner">
            {chatHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                <strong>{entry.user}:</strong> {entry.message}
              </div>
            ))}
          </div>
          <div className="bg-white p-2 border-t border-gray-200 flex items-center shadow-md">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
