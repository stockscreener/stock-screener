package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "watchlists_stocks")
@Getter
@Setter
public class WatchlistStockEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "watchlist_id")
    private WatchlistEntity watchlist;

    private Long stockId;

}
