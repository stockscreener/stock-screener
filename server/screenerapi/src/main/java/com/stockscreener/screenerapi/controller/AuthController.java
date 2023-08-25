package com.stockscreener.screenerapi.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.AuthRequestDTO;
import com.stockscreener.screenerapi.dto.AuthResponseDTO;
import com.stockscreener.screenerapi.dto.user.RegisterUserReqDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.service.UserService;
import com.stockscreener.screenerapi.utils.JwtUtils;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@Validated
public class AuthController {
	@Autowired
	private AuthenticationManager mgr;
	@Autowired
	private JwtUtils utils;
	@Autowired
	private UserService userService;
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping("/signin")
	public ResponseEntity<?> loginUser(@RequestBody @Valid AuthRequestDTO auth){
		Authentication principal = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword()));
		// generate JWT
		String jwtToken = utils.generateJwtToken(principal);
		AuthResponseDTO authenticatedUser = userService.authenticateUser(auth);
		authenticatedUser.setToken(jwtToken);
		return ResponseEntity.ok(authenticatedUser);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterUserReqDTO user){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(mapper.map(
								userService.addNewUser(mapper.map(user, UserEntity.class), user.isAdvisor()),
						AuthResponseDTO.class));
	}
	
}
