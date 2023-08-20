package com.stockscreener.screenerapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.BlogEditReqDTO;
import com.stockscreener.screenerapi.dto.BlogRespDTO;
import com.stockscreener.screenerapi.dto.NewBlogReqDTO;
import com.stockscreener.screenerapi.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/create")
    public String createBlog(@RequestBody NewBlogReqDTO newBlogReqDTO) {
        return blogService.createBlog(newBlogReqDTO);
    }

    @GetMapping("/all")
    public List<BlogRespDTO> getAllBlogs() {
        return blogService.fetchAllBlogs();
    }

    @GetMapping("/my/{userId}")
    public List<BlogRespDTO> getMyBlogs(@PathVariable Long userId) {
        return blogService.fetchMyBlogs(userId);
    }

    @PutMapping("/edit")
    public String editBlog(@RequestBody BlogEditReqDTO blogEditReqDTO) {
        return blogService.editMyBlog(blogEditReqDTO);
    }

    @DeleteMapping("/delete/{blogId}")
    public String deleteBlog(@PathVariable Long blogId) {
        return blogService.deleteMyBlog(blogId);
    }
}
