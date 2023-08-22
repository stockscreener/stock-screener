package com.stockscreener.screenerapi.entity;

import java.util.Objects;

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
    @JoinColumn(nullable = false)
    private ScreenEntity screen;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private StockAttributeEntity stockAttribute;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('EQUAL', 'BELOW', 'ABOVE', 'BELOW_OR_EQUAL', 'ABOVE_OR_EQUAL') default 'EQUAL'")
    private FilterConstraint filterConstraint;

    private Long value;

    private Integer columnPosition;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ScreenFilterEntity other = (ScreenFilterEntity) obj;
		return Objects.equals(id, other.id);
	}

    

}
