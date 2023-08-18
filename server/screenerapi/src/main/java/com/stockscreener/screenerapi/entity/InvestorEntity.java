package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "investors")
@Getter
@Setter
public class InvestorEntity {
	@Id
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "occupation")
    private Occupation occupation;

    @Enumerated(EnumType.STRING)
    @Column(name = "industry")
    private Industry industry;

    @Enumerated(EnumType.STRING)
    @Column(name = "annual_income")
    private AnnualIncome annualIncome;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

}
