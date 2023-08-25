import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function DeleteBlog({ match }) {
  const [blog, setBlog] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch the blog data when the component mounts
    axios.get(`/api/blogs/${match.params.id}`) // Replace with your API endpoint
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });
  }, [match.params.id]);

  const handleDelete = () => {
    // Send a DELETE request to remove the blog
    axios.delete(`/api/blogs/${match.params.id}`) // Replace with your API endpoint
      .then(() => {
        console.log('Blog deleted successfully');
        // Redirect or perform other actions after deleting the blog
        history.push('/'); // Redirect to the blog list page
      })
      .catch((error) => {
        console.error('Error deleting blog:', error);
      });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Delete Blog</h2>
      <p>Are you sure you want to delete the blog: {blog.title}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteBlog;
