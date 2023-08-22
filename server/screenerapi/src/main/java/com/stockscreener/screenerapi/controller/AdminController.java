package com.stockscreener.screenerapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.dto.StockAttributesDTO;
import com.stockscreener.screenerapi.dto.StocksListDTO;
import com.stockscreener.screenerapi.repository.StockAttributeRepository;
import com.stockscreener.screenerapi.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
@Validated
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/stocks")
	public ResponseEntity<?> getAllStocksList(@RequestParam Long adminId) {
		return ResponseEntity.ok(adminService.getAllStocks(adminId));
	}
	
	@PutMapping("/stocks")
	public ResponseEntity<?> updateVisibleStocks(@RequestBody @Valid List<StocksListDTO> stocks){
		return ResponseEntity.ok(adminService.updateVisibleStocks(stocks));
	}
	
	@GetMapping("/attributes")
	public ResponseEntity<?> getStockAttributesList(@RequestParam Long adminId){
		return ResponseEntity.ok(adminService.getAllStockAttributes(adminId));
	}
	
	@PutMapping("/attibutes")
	public ResponseEntity<?> updateVisibleStockAttributes(@RequestBody List<StockAttributesDTO> stockAttributes){
		return ResponseEntity.ok(adminService.updateVisibleStockAttributes(stockAttributes));
	}
	
	@GetMapping("/stats")
	public ResponseEntity<?> getWebsiteStats(){
		
		return ResponseEntity.ok("No stats available yet!");
	}
	
	
}
