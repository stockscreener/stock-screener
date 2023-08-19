package com.stockscreener.screenerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockscreener.screenerapi.entity.InvestorEntity;

public interface InvestorRepository extends JpaRepository<InvestorEntity,Integer> {

}
