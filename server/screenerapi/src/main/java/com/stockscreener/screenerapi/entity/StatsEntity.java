package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "stats")
@Getter
@Setter
@ToString
public class StatsEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(columnDefinition = "DATE default ")
    private LocalDate recordDate;

    private Long newInvestors;

    private Long newAdvisors;

    private Long visits;
}
