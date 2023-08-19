package com.stockscreener.screenerapi.entity;

import javax.persistence.*;

import com.stockscreener.screenerapi.enums.FilterConstraint;

import lombok.*;

@Entity
@Table(name = "screen_filters")
@Getter
@Setter
@ToString(exclude = {"stockAttribute", "screen"})
public class ScreenFilterEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id")
    private ScreenEntity screen;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private StockAttributeEntity stockAttribute;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('EQUAL', 'BELOW', 'ABOVE', 'BELOW_OR_EQUAL', 'ABOVE_OR_EQUAL') default 'EQUAL'")
    private FilterConstraint filterConstraint;

    private Long value;

    private Integer columnPosition;
}
