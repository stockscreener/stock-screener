package com.stockscreener.screenerapi.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
@ToString(exclude = {"user"})
public class FeedbackEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @Column(columnDefinition = "TEXT")
    private String review;

    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime reviewedAt;
}
