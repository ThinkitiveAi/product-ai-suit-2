package com.healthcare.provider.service;

import com.healthcare.provider.dto.ProviderAvailabilityRequest;
import com.healthcare.provider.dto.ProviderAvailabilityResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ProviderAvailabilityService {
    ProviderAvailabilityResponse createAvailability(UUID providerId, ProviderAvailabilityRequest request);
    ProviderAvailabilityResponse updateAvailability(UUID providerId, UUID availabilityId, ProviderAvailabilityRequest request);
    void deleteAvailability(UUID providerId, UUID availabilityId, boolean deleteRecurring, String reason);
    ProviderAvailabilityResponse getAvailability(UUID providerId, UUID availabilityId);
    List<ProviderAvailabilityResponse> getAvailabilities(UUID providerId, LocalDate startDate, LocalDate endDate, String status, String appointmentType, String timezone);
} 