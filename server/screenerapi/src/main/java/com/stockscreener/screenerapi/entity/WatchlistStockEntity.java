package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "watchlists_stocks")
@Getter
@Setter
@ToString(exclude = {"watchlist"})
public class WatchlistStockEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private WatchlistEntity watchlist;

    private Long stockId;

}
