import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  _id: string;
  content: string;
  image: string;
  createdAt: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', { withCredentials: true });
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <p>{post.content}</p>
          {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" />}
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
