package com.stockscreener.screenerapi.service;

import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.screen.EditScreenDTO;
import com.stockscreener.screenerapi.dto.screen.NewScreenDTO;
import com.stockscreener.screenerapi.dto.screen.ScreenDTO;

import java.util.List;

public interface ScreenService {
	List<ScreenDTO> getAllScreens(Long userId);
	List<ScreenDTO> getMyScreens(Long userId);
	ApiResponseDTO addNewScreen(NewScreenDTO newScreen);
	ApiResponseDTO editScreen(EditScreenDTO screen);
	EditScreenDTO getScreenDetails(Long userId, Long screenId);
	
}
