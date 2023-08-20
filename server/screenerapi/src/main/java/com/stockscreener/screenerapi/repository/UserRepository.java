package com.stockscreener.screenerapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockscreener.screenerapi.entity.UserEntity;

import java.lang.String;
import java.util.List;
@Repository

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmailAndPassword(String Email, String pass);

	Optional<UserEntity> findByIdAndPassword(Long id, String currentPassword);


}
