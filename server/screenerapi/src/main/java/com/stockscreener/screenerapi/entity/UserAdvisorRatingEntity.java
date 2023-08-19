package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_advisor_ratings")
@Getter
@Setter
@ToString(exclude = {"user", "advisor"})
public class UserAdvisorRatingEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    private AdvisorEntity advisor;

    private Integer rating;

}	
