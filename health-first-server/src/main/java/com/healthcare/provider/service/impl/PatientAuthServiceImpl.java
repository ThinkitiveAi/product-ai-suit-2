package com.healthcare.provider.service.impl;

import com.healthcare.provider.dto.PatientLoginRequest;
import com.healthcare.provider.entity.Patient;
import com.healthcare.provider.repository.PatientRepository;
import com.healthcare.provider.service.PatientAuthService;
import com.healthcare.provider.service.dto.PatientLoginResponse;
import com.healthcare.provider.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientAuthServiceImpl implements PatientAuthService {
    private final PatientRepository patientRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public PatientLoginResponse login(PatientLoginRequest request) {
        Optional<Patient> patientOpt = patientRepository.findByEmail(request.getEmail());
        if (patientOpt.isEmpty()) {
            return PatientLoginResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }
        Patient patient = patientOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), patient.getPasswordHash())) {
            return PatientLoginResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }
        String token = jwtTokenProvider.generateTokenForPatient(patient, 1800); // 30 min
        return PatientLoginResponse.builder()
                .success(true)
                .message("Login successful")
                .accessToken(token)
                .expiresIn(30 * 60)
                .tokenType("Bearer")
                .patient(patient)
                .build();
    }
} 