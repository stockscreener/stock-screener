package com.stockscreener.screenerapi.dto.screen;

import lombok.*;
import java.util.List;
@Getter
@Setter
public class NewScreenDTO {
	
	private Long userId;
	private String name;
    private String description;
    private boolean isPremium;
    private List<ScreenFilterDTO> screenFilters;
}
