package com.stockscreener.screenerapi.dto;

import javax.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterUserReqDTO {
	@Email
	private String email;
	@NotBlank
	private String password;
	@NotBlank
	private String confirmPassword;
	private boolean advisor; 
}
