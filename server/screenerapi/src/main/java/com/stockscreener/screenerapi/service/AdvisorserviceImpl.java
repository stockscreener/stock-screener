package com.stockscreener.screenerapi.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.dto.AdvisorResponseDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.repository.Advisorrepository;
import org.modelmapper.ModelMapper;
@Service
@Transactional
public class AdvisorserviceImpl implements AdvisorService {
	@Autowired
	private ModelMapper Mapper;
	@Autowired
	private Advisorrepository advisorrepository;
	@Override
	
	public AdvisorResponseDTO addNewAdvisordetails(AdvisorEntity advisor)
	{
	
		AdvisorEntity returnAdvisor =advisorrepository.save(advisor);
		return Mapper.map(returnAdvisor,AdvisorResponseDTO.class);
	}

}
