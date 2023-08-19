package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Getter
@Setter
@ToString(exclude = {"user"})
public class SessionEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @Column(name = "ip_address", length = 40)
    private String ipAddress;

    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime startTime;

    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime endTime;

    private boolean isValid;
	
}
