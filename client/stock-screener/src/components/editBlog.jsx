import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editBlog } from '../redux/actions/blogActions';

function EditBlog({ blog, editBlog }) {
  const [blogData, setBlogData] = useState({
    title: blog.title,
    content: blog.content,
  });

  useEffect(() => {
    // Update the component state when the blog prop changes
    setBlogData({
      title: blog.title,
      content: blog.content,
    });
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the editBlog action
    editBlog({ ...blogData, id: blog.id });
    // Redirect or perform other actions after editing the blog
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

const mapStateToProps = (state, ownProps) => {
  // Assuming that the blog data is passed as props
  const blogId = ownProps.match.params.id; // Assuming you use react-router to get the blog id from the URL
  const blog = state.blog.blogs.find((blog) => blog.id === parseInt(blogId));
  return {
    blog,
  };
};

export default connect(mapStateToProps, { editBlog })(EditBlog);
