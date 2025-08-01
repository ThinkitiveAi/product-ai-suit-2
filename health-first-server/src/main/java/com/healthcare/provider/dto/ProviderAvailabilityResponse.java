package com.healthcare.provider.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderAvailabilityResponse {
    private UUID availabilityId;
    private UUID providerId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String timezone;
    private boolean isRecurring;
    private String recurrencePattern;
    private LocalDate recurrenceEndDate;
    private int slotDuration;
    private int breakDuration;
    private String status;
    private int maxAppointmentsPerSlot;
    private int currentAppointments;
    private String appointmentType;
    private Location location;
    private Pricing pricing;
    private String notes;
    private List<String> specialRequirements;
    private List<Slot> slots;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Slot {
        private UUID slotId;
        private String startTime;
        private String endTime;
        private String status;
        private String appointmentType;
        private Location location;
        private Pricing pricing;
        private List<String> specialRequirements;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Location {
        private String type;
        private String address;
        private String roomNumber;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Pricing {
        private BigDecimal baseFee;
        private Boolean insuranceAccepted;
        private String currency;
    }
} 