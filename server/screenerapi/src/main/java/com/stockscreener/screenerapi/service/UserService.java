package com.stockscreener.screenerapi.service;

import java.util.List;

import com.stockscreener.screenerapi.dto.*;
import com.stockscreener.screenerapi.entity.UserEntity;

public interface UserService {
	
	UserEntity getUserProfile(Long userId);
	AdminProfileDTO updateAdminProfile(AdminProfileDTO admin);
	AdvisorProfileDTO updateAdvisorProfile(AdvisorProfileDTO advisor);
	InvestorProfileDTO updateInvestorProfile(InvestorProfileDTO admin);
	
	List<UserEntity> getAllUsers();
	UserEntity addNewUser(UserEntity user, boolean isAdvisor);
	UserEntity getUserDetails(long id);
	ApiResponseDTO deleteUserDetails (Long id);
	AuthResponseDTO authenticateUser(AuthRequestDTO request);
	ApiResponseDTO updatePassword(UpdatePasswordDTO passwordDto);
	

}
