package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "investors")
@Getter
@Setter
@ToString(exclude = "user")
public class InvestorEntity {
	@Id
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Occupation occupation;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Industry industry;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private AnnualIncome annualIncome;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

}
