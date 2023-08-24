package com.stockscreener.screenerapi.dto;

import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthResponseDTO {	
	private Long id;
	private UserStatus status;
	private String message;
	private String token;
	private String name;
	private UserRole role;
	private String username;	
}
