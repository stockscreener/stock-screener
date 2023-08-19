package com.stockscreener.screenerapi.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.dto.ApiResponse;
import com.stockscreener.screenerapi.dto.AuthRequest;
import com.stockscreener.screenerapi.dto.AuthResponse;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.entity.UserStatus;
import com.stockscreener.screenerapi.repository.UserRepository;


@Service
@Transactional
public class UserServicesImpl implements UserService {
	@Autowired
	private UserRepository userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<UserEntity> getAllUsers() {
		
		return userDao.findAll();
	}
	
	@Override
	public UserEntity addNewUser(UserEntity user) {
		return userDao.save(user);
	}

	@Override
	public ApiResponse deleteUserDetails(Long id) {
		UserEntity user=getUserDetails(id);
		if(user.getStatus()==UserStatus.ACTIVE) {
		user.setStatus(UserStatus.DELETED);
		return new ApiResponse("User Details Deleted Successfully....") ;
		}
		else
		{
	    return new ApiResponse("User Status Is Not Active....") ;
		}
			
		
		
	}

	

	@Override
	public UserEntity getUserDetails(long id) {
		return userDao.findById(id).orElseThrow(()->new ResourceNotFoundException("User Id is Invalid....."));
	}

	@Override
	public AuthResponse authenticateUser(AuthRequest request) {
		UserEntity user=userDao.findByUsernameAndPassword(request.getUsername(),request.getPassword())
				.orElseThrow(()->new ResourceNotFoundException("Invalid UserName Or Password..."));
		
		
		return mapper.map(user, AuthResponse.class);
	}
	

}
