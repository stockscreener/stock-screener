package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock_attributes")
@Getter
@Setter
@ToString
public class StockAttributeEntity {
 	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100)
    private String name;

    private boolean isVisible;
}
