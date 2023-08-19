package com.stockscreener.screenerapi.service;

import java.util.List;

import com.stockscreener.screenerapi.dto.ApiResponse;
import com.stockscreener.screenerapi.dto.AuthRequest;
import com.stockscreener.screenerapi.dto.AuthResponse;
import com.stockscreener.screenerapi.entity.UserEntity;

public interface UserService {
	List<UserEntity> getAllUsers();
	UserEntity addNewUser(UserEntity user);
	UserEntity getUserDetails(long id);
	ApiResponse deleteUserDetails (Long id);
	AuthResponse authenticateUser(AuthRequest request);
	

}
