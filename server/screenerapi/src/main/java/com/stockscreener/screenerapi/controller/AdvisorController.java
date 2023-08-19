package com.stockscreener.screenerapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.service.AdvisorService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class AdvisorController {
	@Autowired
	private AdvisorService advisorService;
	
	public AdvisorController()
	{
		System.out.println("In ctor of"+getClass());
	}
	
	@PostMapping
	public AdvisorEntity addAdvisor(@RequestBody AdvisorEntity advisor)
	{
		return advisorService.addNewAdvisordetails(advisor);
	}

}
