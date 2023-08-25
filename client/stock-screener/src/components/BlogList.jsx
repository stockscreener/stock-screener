import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs when the component mounts
    axios.get('/api/blogs') // Replace with your API endpoint
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={`/edit/${blog.id}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
