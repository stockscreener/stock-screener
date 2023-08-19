package com.stockscreener.screenerapi.service;

import java.util.List;

import com.stockscreener.screenerapi.dto.BlogEditReqDTO;
import com.stockscreener.screenerapi.dto.BlogRespDTO;
import com.stockscreener.screenerapi.dto.NewBlogReqDTO;

public interface BlogService {
	String createBlog(NewBlogReqDTO blog);
	
	// only fetch active blogs (isAvailable = true)
	List<BlogRespDTO> fetchAllBlogs();
	List<BlogRespDTO> fetchMyBlogs(Long userId);
	
	// only edit if blog is available 
	String editMyBlog(BlogEditReqDTO blog); 
	
	// set blog isAvailable to false
	String deleteMyBlog(Long blogId);
	
}
