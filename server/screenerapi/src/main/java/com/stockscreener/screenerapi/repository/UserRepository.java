package com.stockscreener.screenerapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stockscreener.screenerapi.dto.user.LimitedUserDetailsDTO;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;

import java.lang.String;
import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmailAndPassword(String Email, String pass);

	Optional<UserEntity> findByIdAndPassword(Long id, String currentPassword);

	@Query("SELECT new com.stockscreener.screenerapi.dto.user.LimitedUserDetailsDTO"
			+ "(u.id, u.name, u.username, u.status, a.verificationStatus)"
			+ "FROM UserEntity u LEFT JOIN u.advisor a WHERE u.status != 'DELETED' AND u.role = ?1")
	List<LimitedUserDetailsDTO> fetchLimitedUserDetails(UserRole role);
	
	@Query("SELECT new com.stockscreener.screenerapi.entity.UserEntity"
			+ "(u.id, u.status, u.role) FROM UserEntity u WHERE u.id = ?1")
	Optional<UserEntity> fetchUserStatusRole(Long id);
	
	List<UserEntity> findByIdInAndStatusNot(List<Long> ids, UserStatus deleted);

}
