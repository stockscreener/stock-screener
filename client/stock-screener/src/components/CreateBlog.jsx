import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to create a new blog
    axios.post('/api/blogs', blogData) // Replace with your API endpoint
      .then((response) => {
        console.log('Blog created successfully:', response.data);
        // Redirect or perform other actions after creating a blog
      })
      .catch((error) => {
        console.error('Error creating blog:', error);
      });
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={blogData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={blogData.content} onChange={handleChange} />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
