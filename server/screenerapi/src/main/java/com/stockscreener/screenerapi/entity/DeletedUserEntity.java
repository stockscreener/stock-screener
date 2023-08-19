package com.stockscreener.screenerapi.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "deleted_users")
@Getter
@Setter
@ToString(exclude = "user")
public class DeletedUserEntity {
	@Id
    private Long id;

    @Column(length = 255)
    private String reason;
    
    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime deletedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

}
