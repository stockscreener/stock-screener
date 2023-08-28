package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long>{
	
}
