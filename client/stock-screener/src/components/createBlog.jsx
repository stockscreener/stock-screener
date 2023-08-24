import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../redux/actions/blogActions';

function CreateBlog({ createBlog }) {
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
        createBlog(blogData);
        // Redirect or perform other actions after creating a blog
      };
    
      return (
        <div>
          <h2>Create Blog</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Enter Blog Title</label>
              <input type="text" name="title" value={blogData.title} onChange={handleChange} />
            </div>
            <div>
              <label>Write your blog here</label>
              <textarea name="content" value={blogData.content} onChange={handleChange} />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      );
    }
    
    export default connect(null, { createBlog })(CreateBlog);
    