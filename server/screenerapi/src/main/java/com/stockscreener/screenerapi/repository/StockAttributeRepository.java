package com.stockscreener.screenerapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.StockAttributeEntity;

public interface StockAttributeRepository extends JpaRepository<StockAttributeEntity, Long>{
	// get all attributes
	// get all available attributes
	List<StockAttributeEntity>findByIsVisible(Boolean isVisible);
}
