package com.stockscreener.screenerapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockscreener.screenerapi.dto.WatchlistResponse;
import com.stockscreener.screenerapi.entity.WatchlistEntity;
import com.stockscreener.screenerapi.service.WatchlistService;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin(origins = "*")
public class WatchlistController {
	
	@Autowired
	private WatchlistService watchlistService;
	
	
	@GetMapping
	public List<WatchlistResponse> getAllWatchlist()
	{
		return watchlistService.getAllWatchlist();
		
	}
	
	@GetMapping("/{id}")
	public WatchlistResponse getWatchlistById(Long id)
	{
	   return watchlistService.getWatchlistbyId(id);
	
	}
	
	@PostMapping
	public WatchlistResponse addNewWatchlist(Long id,String name)
	{
		return watchlistService.addNewWatchlist( id, name);
	}
	
}

