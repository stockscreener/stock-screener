import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../redux/actions/blogActions';

function BlogList({ blogs, loading, error, fetchBlogs }) {
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  loading: state.blog.loading,
  error: state.blog.error,
});

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
