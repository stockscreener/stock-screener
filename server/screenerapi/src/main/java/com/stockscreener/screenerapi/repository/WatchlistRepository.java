package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.WatchlistEntity;

public interface WatchlistRepository extends JpaRepository<WatchlistEntity, Long> {

}
