import React, { useState } from 'react';
import axios from 'axios';

const PostForm: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/posts', { content }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContent('');
      alert('Post created successfully');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
