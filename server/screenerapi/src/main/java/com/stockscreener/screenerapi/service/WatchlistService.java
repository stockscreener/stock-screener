package com.stockscreener.screenerapi.service;

import java.util.List;

import com.stockscreener.screenerapi.dto.WatchlistResponse;
import com.stockscreener.screenerapi.entity.WatchlistEntity;

public interface WatchlistService {
	public List<WatchlistResponse> getAllWatchlist();
	public WatchlistResponse getWatchlistbyId(Long id);
	public WatchlistResponse addNewWatchlist(Long id,String name);
}
