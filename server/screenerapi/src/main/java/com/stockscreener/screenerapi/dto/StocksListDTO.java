package com.stockscreener.screenerapi.dto;

import javax.validation.constraints.NotNull;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class StocksListDTO {
	@NotNull
	private Long id;
    private String name;
    @NotNull
    private boolean isVisible;
}
