package com.healthcare.provider.service;

import com.healthcare.provider.dto.ProviderCreateRequest;
import com.healthcare.provider.service.dto.ProviderRegistrationResponse;
import com.healthcare.provider.dto.ProviderLoginRequest;
import com.healthcare.provider.service.dto.ProviderLoginResponse;

public interface ProviderService {
    ProviderRegistrationResponse registerProvider(ProviderCreateRequest request);
    ProviderLoginResponse loginProvider(ProviderLoginRequest request);
} 