package com.stockscreener.screenerapi.controller;

import java.lang.ProcessBuilder.Redirect;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.ApiResponse;
import com.stockscreener.screenerapi.dto.AuthRequest;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")

public class UserController {
	@Autowired
	private UserService userService;
	public UserController() {
		System.out.println("in ctor of"+getClass());
	}
	
	@GetMapping
	public List<UserEntity> listAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/profile")
	public UserEntity addUser(@RequestBody UserEntity user )
	{
		return userService.addNewUser(user);
	}
	
	@PostMapping("/signup")
	public String  signUp(@RequestParam String email,@RequestParam String password,@RequestParam String confirmpassword,@RequestParam UserRole role )
	{
		UserEntity newuser=new UserEntity(  email,  password, confirmpassword,role);
		 userService.addNewUser(newuser);
		 return "redirect:/signIn";
	}
	
	@DeleteMapping("/{id}")
	public ApiResponse deleteUserDetails(@PathVariable Long id)
	{
		return userService.deleteUserDetails(id);
	}
	
	@PutMapping
	public UserEntity updateUserDetails(@RequestBody UserEntity user)
	{
         userService.getUserDetails(user.getId());
         return userService.addNewUser(user);
         
     }
	
	@PostMapping("/signIn")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest request)
	{
		System.out.println("In SignIn "+request);
		return new ResponseEntity<>(userService.authenticateUser(request),HttpStatus.OK);
	}
	
	
	
}
