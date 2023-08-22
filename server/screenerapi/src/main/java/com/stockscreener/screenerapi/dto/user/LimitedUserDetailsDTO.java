package com.stockscreener.screenerapi.dto.user;

import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;
import com.stockscreener.screenerapi.enums.UserStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LimitedUserDetailsDTO {
	private Long id;
	private String name;
    private String username;
    private UserStatus status;
    private AdvisorVerificationStatus verificationStatus;
}
