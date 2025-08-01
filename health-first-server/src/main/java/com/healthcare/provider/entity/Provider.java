package com.healthcare.provider.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "provider", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phone_number"),
        @UniqueConstraint(columnNames = "license_number")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Provider {
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

    @Column(name = "specialization", nullable = false, length = 100)
    @NotBlank
    @Size(min = 3, max = 100)
    private String specialization;

    @Column(name = "license_number", nullable = false, unique = true)
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String licenseNumber;

    @Column(name = "years_of_experience", nullable = false)
    @Min(0)
    @Max(50)
    private int yearsOfExperience;

    @Builder.Default
    @Column(name = "role", nullable = false)
    private String role = "PROVIDER";

    @Embedded
    private ClinicAddress clinicAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClinicAddress {
        @Column(name = "clinic_street", nullable = false, length = 200)
        @NotBlank
        @Size(max = 200)
        private String street;

        @Column(name = "clinic_city", nullable = false, length = 100)
        @NotBlank
        @Size(max = 100)
        private String city;

        @Column(name = "clinic_state", nullable = false, length = 50)
        @NotBlank
        @Size(max = 50)
        private String state;

        @Column(name = "clinic_zip", nullable = false, length = 20)
        @NotBlank
        @Pattern(regexp = "^[0-9A-Za-z- ]{3,20}$")
        private String zip;
    }
} 