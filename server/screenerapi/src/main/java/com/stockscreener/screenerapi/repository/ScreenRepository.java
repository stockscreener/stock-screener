package com.stockscreener.screenerapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.ScreenEntity;

public interface ScreenRepository extends JpaRepository<ScreenEntity, Long>{

	// get all screens
	List<ScreenEntity> findByIsAvailable(boolean isAvailable);
	
	// get users screens
	List<ScreenEntity> findByIsAvailableAndUserId(boolean isAvailable, Long userId);
	
	// get screen of a user
	Optional<ScreenEntity> findByIdAndIsAvailableAndUserId(Long screenId, boolean isAvailable, Long userId);

	// get particular available screen
	Optional<ScreenEntity> findByIdAndIsAvailable(Long screenId, boolean isAvailable);
}
