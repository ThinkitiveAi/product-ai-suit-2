package com.healthcare.provider.service.dto;

import com.healthcare.provider.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientLoginResponse {
    private boolean success;
    private String message;
    private String accessToken;
    private int expiresIn;
    private String tokenType;
    private Patient patient;
} 