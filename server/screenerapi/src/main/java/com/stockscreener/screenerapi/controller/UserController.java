package com.stockscreener.screenerapi.controller;

import java.util.List;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.AdminProfileDTO;
import com.stockscreener.screenerapi.dto.AdvisorProfileDTO;
import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.AuthRequestDTO;
import com.stockscreener.screenerapi.dto.InvestorProfileDTO;
import com.stockscreener.screenerapi.dto.UpdatePasswordDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
@Validated
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper mapper;
	
	// Get profile of any user
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(@RequestParam Long userId){
		UserEntity user = userService.getUserProfile(userId);
		if(user.getRole().equals(UserRole.INVESTOR)) {
			InvestorProfileDTO investor = new InvestorProfileDTO();
			mapper.map(user, investor);
			mapper.map(user.getInvestor(), investor);
			return ResponseEntity.ok(investor);
		}else if(user.getRole().equals(UserRole.ADVISOR)){
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
		System.out.println(investor);
		return ResponseEntity.ok(userService.updateInvestorProfile(investor));
	}
	
	// update profile for Advisor
	@PutMapping("/advisor/profile")
	public ResponseEntity<?> updateAdvisorProfile(@RequestBody @Valid AdvisorProfileDTO advisor){
		return ResponseEntity.ok(userService.updateAdvisorProfile(advisor));
	}
	
	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody @Valid UpdatePasswordDTO passwordDto){
		if(!passwordDto.getNewPassword().equals(passwordDto.getConfirmPassword()))
			return ResponseEntity.badRequest().body(new ApiResponseDTO("New Password and Confirm Password Must Match!"));
		return ResponseEntity.ok(userService.updatePassword(passwordDto));
	}
	
//	@GetMapping
//	public List<UserEntity> listAllUsers(){
//		return userService.getAllUsers();
//	}
//	@PutMapping("//profile")
//	public UserEntity addUser(@RequestBody UserEntity user)
//	{
//		return userService.addNewUser(user, false);
//	}
//	
//	@DeleteMapping("/{id}")
//	public ApiResponseDTO deleteUserDetails(@PathVariable Long id)
//	{
//		return userService.deleteUserDetails(id);
//	}
//	
//	@PutMapping
//	public UserEntity updateUserDetails(@RequestBody UserEntity user)
//	{
//         userService.getUserDetails(user.getId());
//         return userService.addNewUser(user, false);
//         
//     }

	
}
