package com.healthcare.provider.service;

import com.healthcare.provider.dto.PatientCreateRequest;
import com.healthcare.provider.service.dto.PatientRegistrationResponse;

public interface PatientService {
    PatientRegistrationResponse registerPatient(PatientCreateRequest request, String providerId);
} 