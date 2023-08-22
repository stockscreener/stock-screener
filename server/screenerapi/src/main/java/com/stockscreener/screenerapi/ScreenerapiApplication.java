package com.stockscreener.screenerapi;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class ScreenerapiApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(ScreenerapiApplication.class, args);
	}
	
	// Added a model mapper for easy mapping of dto and entity
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}
	
	// Bean to make calls to stock Rest APIs
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplateBuilder().build();
	}

}
