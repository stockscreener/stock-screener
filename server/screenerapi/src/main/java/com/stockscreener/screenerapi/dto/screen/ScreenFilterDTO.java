package com.stockscreener.screenerapi.dto.screen;

import com.stockscreener.screenerapi.enums.FilterConstraint;

import lombok.*;

@Getter
@Setter
public class ScreenFilterDTO {
	private Long stockAttributeId;
    private FilterConstraint filterConstraint;
    private Long value;
    private Integer columnPosition;
}
