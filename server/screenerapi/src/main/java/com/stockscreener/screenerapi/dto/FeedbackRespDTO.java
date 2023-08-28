package com.stockscreener.screenerapi.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
public class FeedbackRespDTO {
	@NotNull
	@NotBlank
	private String review;
}
