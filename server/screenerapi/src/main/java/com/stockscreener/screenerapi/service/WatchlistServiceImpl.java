package com.stockscreener.screenerapi.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.dto.WatchlistResponse;
import com.stockscreener.screenerapi.entity.WatchlistEntity;
import com.stockscreener.screenerapi.repository.WatchlistRepository;

@Service
@Transactional
public class WatchlistServiceImpl implements WatchlistService {
	
	@Autowired
	private WatchlistRepository watchlistRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public List<WatchlistResponse> getAllWatchlist() {
	        List<WatchlistEntity> watchlistEntities = watchlistRepository.findAll();
	        List<WatchlistResponse> watchlistResponses = new ArrayList<>();

	        for (WatchlistEntity entity : watchlistEntities) {
	            WatchlistResponse response = modelMapper.map(entity, WatchlistResponse.class);
	            watchlistResponses.add(response);
	        }

	        return watchlistResponses;
	    }
	@Override
	public WatchlistResponse getWatchlistbyId(Long id) {
		try {
			
			WatchlistEntity watchlistEntity=watchlistRepository.getById(id);
			
			return modelMapper.map(watchlistEntity, WatchlistResponse.class);
		} catch (EntityNotFoundException e) {
			return null;
		}
		
		
		
		
	}
	@Override
	public WatchlistResponse addNewWatchlist(Long id,String name) {
		WatchlistEntity entity=new WatchlistEntity();
		entity.setId(id);
		entity.setName(name);
		WatchlistEntity watchlistEntity=watchlistRepository.save(entity);
		return modelMapper.map(watchlistEntity, WatchlistResponse.class);
	}
}
