package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.SessionEntity;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {

}
