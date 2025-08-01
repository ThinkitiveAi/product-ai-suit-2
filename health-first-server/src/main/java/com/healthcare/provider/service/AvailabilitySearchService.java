package com.healthcare.provider.service;

import com.healthcare.provider.dto.AvailabilitySearchRequest;
import com.healthcare.provider.dto.AvailabilitySearchResponse;

public interface AvailabilitySearchService {
    AvailabilitySearchResponse search(AvailabilitySearchRequest request);
} 