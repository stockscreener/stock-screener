package com.stockscreener.screenerapi.entity;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = "password")
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
    private LocalDate registeredAt;
    private Integer screenId;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    private Boolean isSubscribed;
}
