package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.AdvisorEntity;

public interface AdvisorRepository extends JpaRepository<AdvisorEntity, Long>{

}
