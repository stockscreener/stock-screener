package com.stockscreener.screenerapi.dto;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthResponse {	
	private Long id;
	private String name;	
	private String username;
	private String email;
	private int mobileno;
	private Date dob;	
	private String country;	
	private String state;
	private String city;
	private int pincode;
	private String occupation;
}
