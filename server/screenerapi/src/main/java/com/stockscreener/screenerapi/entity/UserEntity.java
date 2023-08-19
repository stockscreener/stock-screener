package com.stockscreener.screenerapi.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = {"password", "screens", "advisor", "investor"})
public class UserEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	@Column(length = 100)	
	private String name;
    @Column(length = 100, unique = true)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column(length = 20, unique = true)
    private String mobileNo;
    private LocalDate dob;
    @Column(length = 50)
    private String city;
    @Column(length = 50)
    private String state;
    @Column(length = 50)
    private String country;
    private Integer pincode;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private LocalDateTime registeredAt;
    private Integer screenId;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    private Boolean isSubscribed;

    
/*  Inverse side of Bidirectional entities */
    
    @OneToOne(mappedBy = "user")
    private InvestorEntity investor;

    @OneToOne(mappedBy = "user")
    private AdvisorEntity advisor;

    @OneToMany(mappedBy = "user")
    private List<ScreenEntity> screens;
}
