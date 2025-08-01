package com.healthcare.provider.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderAvailabilityRequest {
    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime startTime;
    @NotNull
    private LocalTime endTime;
    @NotBlank
    private String timezone;
    private boolean isRecurring;
    private String recurrencePattern; // daily/weekly/monthly
    private LocalDate recurrenceEndDate;
    @Min(5)
    private int slotDuration = 30;
    private int breakDuration = 0;
    private String appointmentType = "consultation";
    @Valid
    private Location location;
    @Valid
    private Pricing pricing;
    private List<String> specialRequirements;
    @Size(max = 500)
    private String notes;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Location {
        @NotBlank
        private String type;
        private String address;
        private String roomNumber;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Pricing {
        private BigDecimal baseFee;
        private Boolean insuranceAccepted;
        private String currency = "USD";
    }
} 