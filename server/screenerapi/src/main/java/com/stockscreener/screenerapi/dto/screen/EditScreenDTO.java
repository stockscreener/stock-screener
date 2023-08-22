package com.stockscreener.screenerapi.dto.screen;

import java.util.List;

import lombok.*;

@Getter
@Setter
public class EditScreenDTO {
	private Long id;
	private Long userId;
	private String name;
    private String description;
    private boolean isPremium;
    private List<EditScreenFilterDTO> screenFilters;
}
