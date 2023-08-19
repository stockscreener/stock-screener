package com.stockscreener.screenerapi.entity;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "screen_filters")
@Getter
@Setter
@ToString(exclude = {"stockAttribute", "screen"})
public class ScreenFilterEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id")
    private ScreenEntity screen;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private StockAttributeEntity stockAttribute;

    @Enumerated(EnumType.STRING)
    private FilterConstraint constraint;

    private Long value;

    private int columnPosition;
}
