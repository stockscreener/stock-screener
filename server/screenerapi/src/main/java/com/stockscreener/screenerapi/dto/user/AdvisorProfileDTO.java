package com.stockscreener.screenerapi.dto.user;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;
import com.stockscreener.screenerapi.enums.AnnualIncome;
import com.stockscreener.screenerapi.enums.Gender;
import com.stockscreener.screenerapi.enums.Industry;
import com.stockscreener.screenerapi.enums.Occupation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdvisorProfileDTO {
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long id;
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
    private String registrationNo;
    private LocalDate validTill;
    private String about;
    @JsonProperty(access = Access.READ_ONLY)
    private AdvisorVerificationStatus verificationStatus;
    @JsonProperty(access = Access.READ_ONLY)
    private String verificationRemark;
}
