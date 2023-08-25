package com.stockscreener.screenerapi.dto.user;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.stockscreener.screenerapi.enums.AnnualIncome;
import com.stockscreener.screenerapi.enums.Gender;
import com.stockscreener.screenerapi.enums.Industry;
import com.stockscreener.screenerapi.enums.Occupation;

import lombok.*;

@Getter
@Setter
@ToString
public class InvestorProfileDTO {
	private String name;
    private String username;
    private String email;
    private Gender gender;
    private String mobileNo;
    private LocalDate dob;
    private String city;
    private String state;
    private String country;
    private Integer pincode;
    private Occupation occupation;
    private Industry industry;
    private AnnualIncome annualIncome;
}
