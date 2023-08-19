package com.stockscreener.screenerapi.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;

import lombok.*;

@Entity
@Table(name = "advisors")
@Getter
@Setter
@ToString(exclude = "user")
public class AdvisorEntity {
	@Id
    private Long id;
    @Column(length = 100)
    private String registrationNo;
    private LocalDate validTill;
    @Column(columnDefinition = "TEXT")
    private String about;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('NOT_VERIFIED', 'VERIFIED', 'REJECTED') default 'NOT_VERIFIED'", nullable = false)
    private AdvisorVerificationStatus verificationStatus = AdvisorVerificationStatus.NOT_VERIFIED;
    private String verificationRemark;
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime verifiedAt;
    private Integer rating;
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;
}
