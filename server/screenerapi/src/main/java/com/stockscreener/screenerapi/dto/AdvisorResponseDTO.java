package com.stockscreener.screenerapi.dto;

import java.time.LocalDate;

import com.stockscreener.screenerapi.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdvisorResponseDTO {
	
	private String name;
    private String email;
    private String mobileNo;
    private Gender gender;
    private LocalDate dob;
    private String country;
    private String state;
    private String city;
    private Integer pincode;
    private String registrationNo;
    private LocalDate validTill;
    private String about;
}
