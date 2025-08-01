package com.healthcare.provider.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "patient", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phone_number")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(name = "first_name", nullable = false, length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    @NotBlank
    @Email
    private String email;

    @Column(name = "phone_number", nullable = false, unique = true)
    @NotBlank
    private String phoneNumber;

    @Column(name = "password_hash", nullable = false)
    @NotBlank
    private String passwordHash;

    @Column(name = "date_of_birth", nullable = false)
    @NotNull
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = false)
    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Builder.Default
    @Column(name = "role", nullable = false)
    private String role = "PATIENT";

    @Embedded
    private Address address;

    @Embedded
    private EmergencyContact emergencyContact;

    @ElementCollection
    @CollectionTable(name = "patient_medical_history", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "medical_history")
    private List<String> medicalHistory;

    @Embedded
    private InsuranceInfo insuranceInfo;

    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;

    @Column(name = "phone_verified", nullable = false)
    private boolean phoneVerified = false;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public enum Gender {
        MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Address {
        @Column(name = "street", nullable = false, length = 200)
        @NotBlank
        @Size(max = 200)
        private String street;

        @Column(name = "city", nullable = false, length = 100)
        @NotBlank
        @Size(max = 100)
        private String city;

        @Column(name = "state", nullable = false, length = 50)
        @NotBlank
        @Size(max = 50)
        private String state;

        @Column(name = "zip", nullable = false, length = 20)
        @NotBlank
        @Size(max = 20)
        private String zip;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmergencyContact {
        @Column(name = "emergency_name", length = 100)
        @Size(max = 100)
        private String name;

        @Column(name = "emergency_phone", length = 20)
        private String phone;

        @Column(name = "emergency_relationship", length = 50)
        @Size(max = 50)
        private String relationship;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InsuranceInfo {
        @Column(name = "insurance_provider")
        private String provider;

        @Column(name = "policy_number")
        private String policyNumber;
    }
} 