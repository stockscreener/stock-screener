package com.stockscreener.screenerapi.dto.screen;

import javax.validation.constraints.NotNull;


import lombok.*;

@Getter
@Setter
@ToString
public class ScreenDTO {
	@NotNull
	private Long id;
    private String name;
    private String description;
    private String userName;
    private boolean isPremium;
}
