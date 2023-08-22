package com.stockscreener.screenerapi.service;

import com.stockscreener.screenerapi.dto.user.VerifyAdvisorDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;

public interface AdvisorService {
	AdvisorEntity addNewAdvisor(AdvisorEntity advisor);

	
	VerifyAdvisorDTO verifyAdvisor(VerifyAdvisorDTO verify);
}
