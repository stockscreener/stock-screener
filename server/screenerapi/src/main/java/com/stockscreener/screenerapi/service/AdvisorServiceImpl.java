package com.stockscreener.screenerapi.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.entity.AdvisorEntity;

@Service
@Transactional
public class AdvisorServiceImpl implements AdvisorService{

	@Override
	public AdvisorEntity addNewAdvisor(AdvisorEntity advisor) {
		
		return null;
	}
	
}
