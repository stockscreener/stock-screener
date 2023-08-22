package com.stockscreener.screenerapi.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@ToString
public class UpdatePasswordDTO {
	@NotNull
	private Long id;
	@NotBlank
	@NotNull
	private String currentPassword;
	@NotBlank
	@NotNull
	private String newPassword;
	@NotBlank
	@NotNull
	private String confirmPassword;
}
