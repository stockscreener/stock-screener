package com.stockscreener.screenerapi.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;
import com.stockscreener.screenerapi.enums.Gender;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"password", "screens", "advisor", "investor", "watchlists", "feedbacks"})
public class UserEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(length = 100)	
	private String name;
    @Column(length = 100, unique = true)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('MALE', 'FEMALE', 'OTHER')")
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
    @Column(columnDefinition = "ENUM('INVESTOR', 'ADVISOR', 'ADMIN') default 'INVESTOR'", nullable = false)
    private UserRole role;
    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime registeredAt;
    private Long screenId;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'BLOCKED', 'DELETED') default 'ACTIVE'", nullable = false)
    private UserStatus status;
    private Boolean isSubscribed;

    
/*  Inverse side of Bidirectional entities */
    
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private InvestorEntity investor;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private AdvisorEntity advisor;

    @OneToMany(mappedBy = "user")
    private List<ScreenEntity> screens;
    
    @OneToMany(mappedBy = "user")
    private List<WatchlistEntity> watchlists;
    
    @OneToMany(mappedBy = "user")
    private List<FeedbackEntity> feedbacks;
	public UserEntity(String email2, String password2, String confirmpassword, UserRole role2) {
	
	this.email=email2;
	this.password=password2;
	this.password=confirmpassword;
	this.role=role2;
}
}
