package com.stockscreener.screenerapi.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.AuthRequestDTO;
import com.stockscreener.screenerapi.dto.AuthResponseDTO;
import com.stockscreener.screenerapi.dto.RegisterUserReqDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@Validated
public class AuthController {

	@Autowired
	private UserService userService;
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping("/signin")
	public ResponseEntity<?> loginUser(@RequestBody @Valid AuthRequestDTO auth){
		return ResponseEntity.ok(userService.authenticateUser(auth));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterUserReqDTO user){
		if(!user.getPassword().equals(user.getConfirmPassword())) {
			
			return ResponseEntity.badRequest().body("Passwords do not match!");
		}
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(mapper.map(
								userService.addNewUser(mapper.map(user, UserEntity.class), user.isAdvisor()),
						AuthResponseDTO.class));
		
	}
	
}
