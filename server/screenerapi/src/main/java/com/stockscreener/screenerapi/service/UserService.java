package com.stockscreener.screenerapi.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.stockscreener.screenerapi.dto.*;
import com.stockscreener.screenerapi.dto.user.AdminProfileDTO;
import com.stockscreener.screenerapi.dto.user.AdvisorProfileDTO;
import com.stockscreener.screenerapi.dto.user.DeleteUserDTO;
import com.stockscreener.screenerapi.dto.user.InvestorProfileDTO;
import com.stockscreener.screenerapi.dto.user.LimitedUserDetailsDTO;
import com.stockscreener.screenerapi.dto.user.UpdatePasswordDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;

public interface UserService {
	
	UserEntity getUserProfile(Long userId);
	AdminProfileDTO updateAdminProfile(AdminProfileDTO admin);
	AdvisorProfileDTO updateAdvisorProfile(AdvisorProfileDTO advisor);
	InvestorProfileDTO updateInvestorProfile(InvestorProfileDTO admin);
	
	List<UserEntity> getAllUsers();
	UserEntity addNewUser(UserEntity user, boolean isAdvisor);
	UserEntity getUserDetails(long id);
	ApiResponseDTO deleteUser(DeleteUserDTO user);
	AuthResponseDTO authenticateUser(AuthRequestDTO request);
	ApiResponseDTO updatePassword(UpdatePasswordDTO passwordDto);
	List<LimitedUserDetailsDTO> getLimitedUserDetails(Long userId, UserRole role);
	UserEntity getUserStatusRole(Long id);
	List<LimitedUserDetailsDTO> updateUsersStatus(Map<Long, UserStatus> usersStatus);
	

}
