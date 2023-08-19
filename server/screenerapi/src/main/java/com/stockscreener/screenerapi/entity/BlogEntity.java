package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Getter
@Setter
@ToString(exclude = {"user"})
public class BlogEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private boolean isPremium;

    private boolean isAvailable;

    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;
}
