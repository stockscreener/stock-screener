package com.stockscreener.screenerapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.screen.EditScreenDTO;
import com.stockscreener.screenerapi.dto.screen.NewScreenDTO;
import com.stockscreener.screenerapi.service.ScreenService;

@RestController
@RequestMapping("/screens")
@CrossOrigin("*")
@Validated
public class ScreenController {
	
	@Autowired
	private ScreenService screenService;
	
	@GetMapping
	public ResponseEntity<?> getAllScreens(){
		return ResponseEntity.ok(screenService.getAllScreens());
	}
	
	@GetMapping("/attributes")
	public ResponseEntity<?> getStockAttributes(){
		return ResponseEntity.ok(screenService.getStockAttributes());
	}
	
	@GetMapping("/myscreens")
	public ResponseEntity<?> getMyScreens(@RequestParam Long userId){
		return ResponseEntity.ok(screenService.getMyScreens(userId));
	}
	
	@GetMapping("/details")
	public ResponseEntity<?> getScreenDetails(@RequestParam Long userId, @RequestParam Long screenId){
		return ResponseEntity.ok(screenService.getScreenDetails(userId, screenId));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewScreen(@RequestBody NewScreenDTO newScreen){
		return ResponseEntity.ok(screenService.addNewScreen(newScreen));
	}
	
	@PutMapping
	public ResponseEntity<?> editMyScreen(@RequestBody EditScreenDTO screen){
		return ResponseEntity.ok(screenService.editScreen(screen));
	}
	
	
}
