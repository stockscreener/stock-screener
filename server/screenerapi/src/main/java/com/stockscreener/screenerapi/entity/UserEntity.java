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
@ToString(exclude = {"password", "screens", "advisor", "investor", "watchlists", "feedbacks", "blogs", "deletedUser"})
public class UserEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(length = 100)	
	private String name;
    @Column(length = 100, unique = true)
    private String username;
    @Column(unique = true)
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
    @Column(columnDefinition = "ENUM('ROLE_INVESTOR', 'ROLE_ADVISOR', 'ROLE_ADMIN') default 'ROLE_INVESTOR'", nullable = false)
    private UserRole role;
    @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private LocalDateTime registeredAt;
    private Long screenId;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'BLOCKED', 'DELETED') default 'ACTIVE'", nullable = false)
    private UserStatus status;
    @Column(nullable = false)
    private Boolean isSubscribed = false;

    
/*  Inverse side of Bidirectional entities */
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private InvestorEntity investor;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private AdvisorEntity advisor;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<ScreenEntity> screens;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<WatchlistEntity> watchlists;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<FeedbackEntity> feedbacks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<BlogEntity> blogs;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private DeletedUserEntity deletedUser;
    
    /* Constructors and Methods */
    
	public UserEntity(String email2, String password2, String confirmpassword, UserRole role2) {
		this.email=email2;
		this.password=password2;
		this.password=confirmpassword;
		this.role=role2;
	}
	
	public UserEntity(Long id, UserStatus status, UserRole role) {
		this.id = id;
		this.status = status;
		this.role = role;
	}
	
	public void addInvestor(InvestorEntity investor) {
		this.setInvestor(investor);
		investor.setUser(this);
	}
	
	public void addAdvisor(AdvisorEntity advisor) {
		this.setAdvisor(advisor);
		advisor.setUser(this);
	}
	
	public void addScreen(ScreenEntity screen) {
		this.getScreens().add(screen);
		screen.setUser(this);
	}
	
	public void addWatchlist(WatchlistEntity watchlist) {
		this.getWatchlists().add(watchlist);
		watchlist.setUser(this);
	}
	
	public void addFeedback(FeedbackEntity feedback) {
		this.getFeedbacks().add(feedback);
		feedback.setUser(this);
	}
	
	
}
