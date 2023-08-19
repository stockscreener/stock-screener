package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "watchlists")
@Getter
@Setter
@ToString(exclude = {"user", "screen", "watchlistStocks"})
public class WatchlistEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @Column(name = "name", length = 100)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    private ScreenEntity screen;


    /* Inverse side of Bidirectional Entities */
    
    @OneToMany(mappedBy = "watchlist")
    private List<WatchlistStockEntity> watchlistStocks;
    
}
