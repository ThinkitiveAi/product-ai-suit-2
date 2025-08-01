package com.healthcare.provider.service;

import com.healthcare.provider.dto.PatientLoginRequest;
import com.healthcare.provider.service.dto.PatientLoginResponse;

public interface PatientAuthService {
    PatientLoginResponse login(PatientLoginRequest request);
} 