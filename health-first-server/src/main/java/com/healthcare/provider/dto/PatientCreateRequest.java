package com.healthcare.provider.dto;

import com.healthcare.provider.validation.ValidPassword;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientCreateRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    @ValidPassword
    private String password;

    @NotBlank
    private String confirmPassword;

    @NotNull
    @Past
    private LocalDate dateOfBirth;

    @NotNull
    private String gender;

    @Valid
    @NotNull
    private Address address;

    @Valid
    private EmergencyContact emergencyContact;

    private List<@NotBlank String> medicalHistory;

    @Valid
    private InsuranceInfo insuranceInfo;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Address {
        @NotBlank
        @Size(max = 200)
        private String street;
        @NotBlank
        @Size(max = 100)
        private String city;
        @NotBlank
        @Size(max = 50)
        private String state;
        @NotBlank
        @Size(max = 20)
        private String zip;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmergencyContact {
        @Size(max = 100)
        private String name;
        private String phone;
        @Size(max = 50)
        private String relationship;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InsuranceInfo {
        private String provider;
        private String policyNumber;
    }
} 