package com.stockscreener.screenerapi.dto;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AuthRequestDTO {
	@NotBlank(message = "UserName can't be blank or null!!!")
	@JsonProperty(value = "email")
	private String username;
	@NotBlank(message = "Password required !!!!")
	private String password;
}
