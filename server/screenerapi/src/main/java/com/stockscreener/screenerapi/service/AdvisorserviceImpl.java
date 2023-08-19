package com.stockscreener.screenerapi.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.repository.Advisorrepository;

@Service
@Transactional
public class AdvisorserviceImpl implements AdvisorService {

	@Autowired
	private Advisorrepository advisorrepository;
	@Override
	public AdvisorEntity addNewAdvisordetails(AdvisorEntity advisor) {
		return advisorrepository.save(advisor);
	}

}
