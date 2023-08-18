package com.stockscreener.screenerapi.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "advisors")
@Getter
@Setter
@ToString(exclude = "user")
public class AdvisorEntity {
	@Id
    private int id;
    @Column(length = 100)
    private String registrationNo;
    private LocalDate validTill;
    @Column(columnDefinition = "TEXT")
    private String about;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdvisorVerificationStatus verificationStatus = AdvisorVerificationStatus.NOT_VERIFIED;
    private String verificationRemark;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime verifiedAt;
    private Integer rating;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;
}
