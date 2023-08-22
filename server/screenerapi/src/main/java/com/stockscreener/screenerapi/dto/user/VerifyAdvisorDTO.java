package com.stockscreener.screenerapi.dto.user;

import javax.validation.constraints.NotNull;

import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class VerifyAdvisorDTO {
	@NotNull
	private Long id;
	@NotNull
	private AdvisorVerificationStatus verificationStatus;
	private String verificationRemark;
}
