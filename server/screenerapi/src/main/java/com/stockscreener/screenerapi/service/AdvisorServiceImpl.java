package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.dto.user.VerifyAdvisorDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.repository.AdvisorRepository;



@Service
@Transactional
public class AdvisorServiceImpl implements AdvisorService{
	@Autowired
	private AdvisorRepository advisorRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public AdvisorEntity addNewAdvisor(AdvisorEntity advisor) {
		return null;
	}

	@Override
	public VerifyAdvisorDTO verifyAdvisor(VerifyAdvisorDTO verify) {
		AdvisorEntity advisor = advisorRepository.findById(verify.getId()).orElseThrow(()-> new ResourceNotFoundException("Invalid Advisor!"));
		advisor.setVerifiedAt(LocalDateTime.now());
		mapper.map(verify, advisor);
		advisor = advisorRepository.save(advisor);
		return mapper.map(advisor, VerifyAdvisorDTO.class);
	}
	
}