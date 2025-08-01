package com.healthcare.provider.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderCreateRequest {
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
    @com.healthcare.provider.validation.ValidPhoneNumber
    private String phoneNumber;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @NotBlank
    @Size(min = 8, max = 100)
    private String confirmPassword;

    @NotBlank
    @Size(min = 3, max = 100)
    private String specialization;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String licenseNumber;

    @Min(0)
    @Max(50)
    private int yearsOfExperience;

    @Valid
    @NotNull
    private ClinicAddress clinicAddress;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClinicAddress {
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
        @Pattern(regexp = "^[0-9A-Za-z- ]{3,20}$")
        private String zip;
    }
} 