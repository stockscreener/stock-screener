package com.stockscreener.screenerapi.dto;

import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class StockAttributesDTO {
	@NotNull
	private Long id;
    private String displayName;
    @NotNull
    private boolean isVisible;
}
