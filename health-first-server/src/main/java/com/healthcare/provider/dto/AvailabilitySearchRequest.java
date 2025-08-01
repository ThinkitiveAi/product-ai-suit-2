package com.healthcare.provider.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilitySearchRequest {
    private LocalDate date;
    private LocalDate startDate;
    private LocalDate endDate;
    private String specialization;
    private String location;
    private String appointmentType;
    private Boolean insuranceAccepted;
    private BigDecimal maxPrice;
    private String timezone;
    private Boolean availableOnly = true;
} 