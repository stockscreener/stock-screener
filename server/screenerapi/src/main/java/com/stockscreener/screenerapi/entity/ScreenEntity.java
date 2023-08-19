package com.stockscreener.screenerapi.entity;

import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "screens")
@Getter
@Setter
@ToString(exclude = {"user", "screenFilters"})
public class ScreenEntity {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    @Column(length = 100)
	    private String name;

	    @Column(columnDefinition = "TEXT")
	    private String description;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private UserEntity user;

	    private boolean isAvailable;

	    private boolean isPremium;

	    /* Inverse side of Bidirectional Entities */
	    
	    @OneToMany(mappedBy = "screen")
	    private List<ScreenFilterEntity> screenFilters;
	    
}
