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
    // Display the loading page
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="loader"></div>
              <h3 className="mt-3">Loading...</h3>
            </div>
          </div>
        </div>
        <script
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
          type="text/javascript"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
          type="text/javascript"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          type="text/javascript"
        ></script>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Delete Blog</h2>
              <p className="card-text">
                Are you sure you want to delete the blog: {blog.title}?
              </p>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DeleteBlog;
