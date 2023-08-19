package com.stockscreener.screenerapi.controller;

import java.util.List;
import javax.validation.Valid;
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
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
@Validated
public class UserController {
	@Autowired
	private UserService userService;
	
	// update profile for admin
	@PutMapping("/admin/profile")
	public ResponseEntity<?> method(@RequestBody @Valid AdminProfileDTO admin){
		
		return ResponseEntity.ok(userService.updateAdminProfile(admin));
	}
	
	// update profile for investor
	@PutMapping("/investor/profile")
	public ResponseEntity<?> method(@RequestBody @Valid InvestorProfileDTO investor){
		System.out.println(investor);
		return ResponseEntity.ok(userService.updateInvestorProfile(investor));
	}
	
	// update profile for Advisor
	@PutMapping("/advisor/profile")
	public ResponseEntity<?> method(@RequestBody @Valid AdvisorProfileDTO advisor){
		return ResponseEntity.ok(userService.updateAdvisorProfile(advisor));
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
