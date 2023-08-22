package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.StatsEntity;

public interface StatsRepository extends JpaRepository<StatsEntity, Long>{
	
}
