package com.stockscreener.screenerapi.repository;

import com.stockscreener.screenerapi.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    // Custom query methods can be defined here if needed

    // Find all available blogs (isAvailable = true)
    List<BlogEntity> findByIsAvailable(boolean isAvailable);

    // Find blogs owned by a specific user and available (isAvailable = true)
    List<BlogEntity> findByUserIdAndIsAvailable(Long userId, boolean isAvailable);

    // Find a blog by ID and check if it's available (isAvailable = true)
    Optional<BlogEntity> findByIdAndIsAvailable(Long id, boolean isAvailable);
}
