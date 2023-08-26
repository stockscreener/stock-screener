package com.stockscreener.screenerapi.entity;

import javax.persistence.*;
import com.stockscreener.screenerapi.enums.AnnualIncome;
import com.stockscreener.screenerapi.enums.Industry;
import com.stockscreener.screenerapi.enums.Occupation;
import lombok.*;

@Entity
@Table(name = "investors")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "user")
public class InvestorEntity {
	@Id
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('BUSINESS', 'SERVICE', 'GOVT_EMPLOYEE', 'PROFESSIONAL', 'HOMEMAKER', 'STUDENT', 'RETIRED', 'OTHERS')", length = 20)
    private Occupation occupation;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('AUTO_AND_AUTO_ANCILLARY', 'BANKING_AND_FINANCIAL_SERVICES', 'FMCG', 'INFORMATION_TECHNOLOGY',"
    		+ "'MEDIA_AND_ENTERTAINMENT', 'PHARMA_AND_HEALTHCARE', 'RETAIL', 'REAL_ESTATE', 'TELECOM', 'TRAVEL_AND_TOURISM', 'OTHERS')",
    		length = 50)
    private Industry industry;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('LESS_THAN_5_LAKHS', 'BETWEEN_5_LAKHS_TO_10_LAKHS', 'BETWEEN_10_LAKHS_TO_15_LAKHS', 'BETWEEN_15_LAKHS_TO_20_LAKHS', 'MORE_THAN_20_LAKHS')" , length = 35)
    private AnnualIncome annualIncome;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

}
