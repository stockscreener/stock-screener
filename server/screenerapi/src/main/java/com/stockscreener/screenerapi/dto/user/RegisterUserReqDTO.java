package com.stockscreener.screenerapi.dto.user;

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
	private boolean advisor; 
}
