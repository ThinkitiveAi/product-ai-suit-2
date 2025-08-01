package com.healthcare.provider.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilitySearchResponse {
    private SearchCriteria searchCriteria;
    private int totalResults;
    private List<Result> results;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class SearchCriteria {
        private LocalDate date;
        private String specialization;
        private String location;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Result {
        private ProviderInfo provider;
        private List<Slot> availableSlots;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ProviderInfo {
        private UUID id;
        private String name;
        private String specialization;
        private int yearsOfExperience;
        private double rating;
        private String clinicAddress;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Slot {
        private UUID slotId;
        private LocalDate date;
        private String startTime;
        private String endTime;
        private String appointmentType;
        private ProviderAvailabilityResponse.Location location;
        private ProviderAvailabilityResponse.Pricing pricing;
        private List<String> specialRequirements;
    }
} 