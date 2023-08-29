package com.stockscreener.screenerapi.entity;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
	    private Long id;

	    @Column(length = 100)
	    private String name;

	    @Column(columnDefinition = "TEXT")
	    private String description;

	    @ManyToOne(fetch = FetchType.LAZY)
	    private UserEntity user;

	    private boolean isAvailable;

	    private boolean isPremium;

	    /* Inverse side of Bidirectional Entities */
	    
	    @OneToMany(mappedBy = "screen", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	    private List<ScreenFilterEntity> screenFilters;
	    
	    /* Helper methods */
	    
	    public void addScreenFilters(List<ScreenFilterEntity> screenFilters) {
	    	System.out.println(screenFilters.toString());
	    	System.out.println(this.getScreenFilters());
	    	this.getScreenFilters().addAll(screenFilters);
	    	screenFilters.forEach((filter)->filter.setScreen(this));
	    	screenFilters.forEach(System.out::println);
	    }
}
