package com.healthcare.provider.service.dto;

import com.healthcare.provider.entity.Provider;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderRegistrationResponse {
    private UUID providerId;
    private String email;
    private Provider.VerificationStatus verificationStatus;
} 