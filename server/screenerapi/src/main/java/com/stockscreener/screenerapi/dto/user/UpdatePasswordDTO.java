package com.stockscreener.screenerapi.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@ToString
public class UpdatePasswordDTO {
	@NotBlank
	@NotNull
	private String currentPassword;
	@NotBlank
	@NotNull
	private String newPassword;
}
