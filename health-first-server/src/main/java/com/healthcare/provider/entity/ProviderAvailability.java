package com.healthcare.provider.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "provider_availability")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderAvailability {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    private Provider provider;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private String timezone;

    @Column(nullable = false)
    private boolean isRecurring = false;

    @Enumerated(EnumType.STRING)
    private RecurrencePattern recurrencePattern;

    private LocalDate recurrenceEndDate;

    @Column(nullable = false)
    private int slotDuration = 30;

    @Column(nullable = false)
    private int breakDuration = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SlotStatus status = SlotStatus.AVAILABLE;

    @Column(nullable = false)
    private int maxAppointmentsPerSlot = 1;

    @Column(nullable = false)
    private int currentAppointments = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentType appointmentType = AppointmentType.CONSULTATION;

    @Embedded
    private Location location;

    @Embedded
    private Pricing pricing;

    @Column(length = 500)
    private String notes;

    @ElementCollection
    private List<String> specialRequirements;

    @CreationTimestamp
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    private ZonedDateTime updatedAt;

    public enum RecurrencePattern { DAILY, WEEKLY, MONTHLY }
    public enum SlotStatus { AVAILABLE, BOOKED, CANCELLED, BLOCKED, MAINTENANCE }
    public enum AppointmentType { CONSULTATION, FOLLOW_UP, EMERGENCY, TELEMEDICINE }

    @Embeddable
    @Getter @Setter
    public static class Location {
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private LocationType type;
        private String address;
        private String roomNumber;
        public enum LocationType { CLINIC, HOSPITAL, TELEMEDICINE, HOME_VISIT }
    }

    @Embeddable
    @Getter @Setter
    public static class Pricing {
        private BigDecimal baseFee;
        private Boolean insuranceAccepted;
        private String currency = "USD";
    }
} 