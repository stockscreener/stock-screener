package com.stockscreener.screenerapi.service;

import com.stockscreener.screenerapi.dto.AdvisorResponseDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;

public interface AdvisorService {
	AdvisorResponseDTO addNewAdvisordetails(AdvisorEntity advisor);
}
