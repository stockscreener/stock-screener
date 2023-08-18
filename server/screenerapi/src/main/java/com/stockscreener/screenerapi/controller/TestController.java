package com.stockscreener.screenerapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testapp")
public class TestController {
	
	@GetMapping
	public ResponseEntity<?> testApp(){
		return ResponseEntity.ok("Screener API test !");
	}
}
