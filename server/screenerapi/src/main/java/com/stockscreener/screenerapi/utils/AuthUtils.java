package com.stockscreener.screenerapi.utils;

import org.springframework.security.core.context.SecurityContextHolder;

import com.stockscreener.screenerapi.customException.BadRequestException;
import com.stockscreener.screenerapi.security.CustomUserDetails;

public class AuthUtils {
	
	public static CustomUserDetails customUserDetails() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		CustomUserDetails userDetails = null; 
		if(principal instanceof CustomUserDetails)
			 userDetails= (CustomUserDetails) principal;
		if(userDetails == null)
			throw new BadRequestException("Try again later or Login!");
		return userDetails;
	}
}
