package com.healthcare.provider.controller;

import com.healthcare.provider.dto.PatientLoginRequest;
import com.healthcare.provider.service.PatientAuthService;
import com.healthcare.provider.service.dto.PatientLoginResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patient")
@RequiredArgsConstructor
public class PatientAuthController {
    private final PatientAuthService patientAuthService;

    @PostMapping("/login")
    public ResponseEntity<PatientLoginResponse> login(@Valid @RequestBody PatientLoginRequest request) {
        PatientLoginResponse response = patientAuthService.login(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
} 