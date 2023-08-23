package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.customException.UserDoesNotHaveProperPermission;
import com.stockscreener.screenerapi.dto.BlogEditReqDTO;
import com.stockscreener.screenerapi.dto.BlogRespDTO;
import com.stockscreener.screenerapi.dto.NewBlogReqDTO;
import com.stockscreener.screenerapi.entity.BlogEntity;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.repository.BlogRepository;
import com.stockscreener.screenerapi.repository.UserRepository;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @Autowired
	private ModelMapper mapper;
    
    @Autowired
    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String createBlog(NewBlogReqDTO newBlogReqDTO) {
        // Create a new BlogEntity and copy properties from the DTO
        BlogEntity blogEntity = new BlogEntity();
        BeanUtils.copyProperties(newBlogReqDTO, blogEntity);

        // Set additional properties such as creation timestamp, user, and availability
        blogEntity.setCreatedAt(LocalDateTime.now());
        blogEntity.setUser(userRepository.findById(newBlogReqDTO.getUserId()).orElse(null));
        blogEntity.setAvailable(true);

        // Save the blog to the repository
        blogRepository.save(blogEntity);
        return "Blog created successfully.";
        
        
		BlogEditReqDTO advisor;
		UserEntity userEntity = userRepository.findById(advisor.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
    	
        if(!userEntity.getRole().equals(UserRole.ADVISOR))
        	throw new UserDoesNotHaveProperPermission("Permission denied. Only Advisors can create blogs.");
    }

    @Override
    public List<BlogRespDTO> fetchAllBlogs() {
        // Fetch all available blogs from the repository
        List<BlogEntity> blogEntities = blogRepository.findByIsAvailable(true);

        // Convert the fetched entities to DTOs and collect them into a list
        return blogEntities.stream()
                .map(this::convertToBlogRespDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BlogRespDTO> fetchMyBlogs(Long userId) {
        // Fetch blogs owned by a specific user and that are available
        List<BlogEntity> blogEntities = blogRepository.findByUserIdAndIsAvailable(userId, true);

        // Convert the fetched entities to DTOs and collect them into a list
        return blogEntities.stream()
                .map(this::convertToBlogRespDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String editMyBlog(BlogEditReqDTO blogEditReqDTO) {
        // Fetch the blog to edit and check if it's available
        BlogEntity blogEntity = blogRepository.findByIdAndIsAvailable(blogEditReqDTO.getId(), true)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found or not available for editing."));

        // Update the blog properties using BeanUtils
        BeanUtils.copyProperties(blogEditReqDTO, blogEntity);

        // Save the edited blog
        blogRepository.save(blogEntity);
        return "Blog edited successfully.";

        BlogEditReqDTO advisor;
		UserEntity userEntity = userRepository.findById(advisor.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
    	
        if(!userEntity.getRole().equals(UserRole.ADVISOR))
        	throw new UserDoesNotHaveProperPermission("Permission denied. Only Advisors can edit blogs.");
    
    }

    @Override
    public String deleteMyBlog(Long blogId) {
        // Fetch the blog to delete and check if it's available
        BlogEntity blogEntity = blogRepository.findByIdAndIsAvailable(blogId, true)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found or not available for deletion."));

        // Set the blog as unavailable
        blogEntity.setAvailable(false);

        // Save the updated blog to mark it as deleted
        blogRepository.save(blogEntity);

        return "Blog deleted successfully.";
        
        BlogEditReqDTO advisor;
		UserEntity userEntity = userRepository.findById(advisor.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
    	
        if(!userEntity.getRole().equals(UserRole.ADVISOR))
        	throw new UserDoesNotHaveProperPermission("Permission denied. Only Advisors can delete blogs.");
    
    }

    private BlogRespDTO convertToBlogRespDTO(BlogEntity blogEntity) {
        // Convert a BlogEntity to a BlogRespDTO
        BlogRespDTO blogRespDTO = new BlogRespDTO();
        BeanUtils.copyProperties(blogEntity, blogRespDTO);
        return blogRespDTO;
    }
}
