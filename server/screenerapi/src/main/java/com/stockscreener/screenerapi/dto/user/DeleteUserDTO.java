package com.stockscreener.screenerapi.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class DeleteUserDTO {
	@NotNull
	private Long id;
	@NotNull
	@NotBlank
	private String reason;
}
