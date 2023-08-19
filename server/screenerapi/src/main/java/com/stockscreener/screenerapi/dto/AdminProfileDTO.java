package com.stockscreener.screenerapi.dto;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.stockscreener.screenerapi.enums.Gender;

import lombok.*;

@Getter
@Setter
public class AdminProfileDTO {
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long id;
	private String name;
    private String username;
    private String email;
    private Gender gender;
    private String mobileNo;
}
