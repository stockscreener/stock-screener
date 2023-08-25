import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditBlog({ match }) {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Fetch the blog data when the component mounts
    axios.get(`/api/blogs/${match.params.id}`) // Replace with your API endpoint
      .then((response) => {
        setBlogData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the blog
    axios.put(`/api/blogs/${match.params.id}`, blogData) // Replace with your API endpoint
      .then((response) => {
        console.log('Blog updated successfully:', response.data);
        // Redirect or perform other actions after updating the blog
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
      });
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={blogData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={blogData.content} onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBlog;