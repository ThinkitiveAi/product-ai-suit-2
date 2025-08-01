package com.healthcare.provider.service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientRegistrationResponse {
    private String patientId;
    private String email;
    private String phoneNumber;
    private boolean emailVerified;
    private boolean phoneVerified;
} 