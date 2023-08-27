package com.stockscreener.screenerapi.controller;

import java.util.Map;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.user.AdminProfileDTO;
import com.stockscreener.screenerapi.dto.user.AdvisorProfileDTO;
import com.stockscreener.screenerapi.dto.user.DeleteUserDTO;
import com.stockscreener.screenerapi.dto.user.InvestorProfileDTO;
import com.stockscreener.screenerapi.dto.user.UpdatePasswordDTO;
import com.stockscreener.screenerapi.dto.user.VerifyAdvisorDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;
import com.stockscreener.screenerapi.service.AdvisorService;
import com.stockscreener.screenerapi.service.UserService;
import com.stockscreener.screenerapi.utils.AuthUtils;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
@Validated
public class UserController {	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdvisorService advisorService;
	
	@Autowired
	private ModelMapper mapper;
	
	// get limited user details
	@GetMapping("/short")
	public ResponseEntity<?> getAllUsersLimitedDetails(@RequestParam UserRole role){
		return ResponseEntity.ok(userService.getLimitedUserDetails(role));
	}
	
	// Get profile of any user
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(){
		UserEntity user = userService.getUserProfile(AuthUtils.customUserDetails().getUserId());
		if(user.getRole().equals(UserRole.ROLE_INVESTOR)) {
			InvestorProfileDTO investor = new InvestorProfileDTO();
			mapper.map(user, investor);
			mapper.map(user.getInvestor(), investor);
			return ResponseEntity.ok(investor);
		}else if(user.getRole().equals(UserRole.ROLE_ADVISOR)){
			AdvisorProfileDTO advisor = new AdvisorProfileDTO();
			mapper.map(user, advisor);
			mapper.map(user.getAdvisor(), advisor);
			return ResponseEntity.ok(advisor);
		}
		return ResponseEntity.ok(mapper.map(user, AdminProfileDTO.class));
	}
	
	// update profile for admin
	@PutMapping("/admin/profile")
	public ResponseEntity<?> updateAdminProfile(@RequestBody @Valid AdminProfileDTO admin){
		return ResponseEntity.ok(userService.updateAdminProfile(admin));
	}
	
	// update profile for investor
	@PutMapping("/investor/profile")
	public ResponseEntity<?> updateInvestorProfile(@RequestBody @Valid InvestorProfileDTO investor){
		return ResponseEntity.ok(userService.updateInvestorProfile(investor));
	}
	
	// update profile for Advisor
	@PutMapping("/advisor/profile")
	public ResponseEntity<?> updateAdvisorProfile(@RequestBody @Valid AdvisorProfileDTO advisor){
		return ResponseEntity.ok(userService.updateAdvisorProfile(advisor));
	}
	
	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody @Valid UpdatePasswordDTO passwordDto){
		return ResponseEntity.ok(userService.updatePassword(passwordDto));
	}
	
	@PutMapping("/verify")
	public ResponseEntity<?> verifyAdvisor(@RequestBody VerifyAdvisorDTO verify){
		System.out.println(verify.getVerificationStatus());
		return ResponseEntity.ok(advisorService.verifyAdvisor(verify));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteUser(@RequestBody DeleteUserDTO user){
		return ResponseEntity.ok(userService.deleteUser(user));
	}
	
	@PutMapping("/disable")
	public ResponseEntity<?> disableUsers(@RequestBody Map<Long, UserStatus> usersStatus){
		
		return ResponseEntity.ok(userService.updateUsersStatus(usersStatus));
	}
	
}
