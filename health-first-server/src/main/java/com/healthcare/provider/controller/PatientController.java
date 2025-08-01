package com.healthcare.provider.controller;

import com.healthcare.provider.dto.PatientCreateRequest;
import com.healthcare.provider.service.PatientService;
import com.healthcare.provider.service.dto.PatientRegistrationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/patient")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@Valid @RequestBody PatientCreateRequest request, Authentication authentication) {
        try {
            String providerId = authentication.getName();
            PatientRegistrationResponse response = patientService.registerPatient(request, providerId);
            Map<String, Object> body = new HashMap<>();
            body.put("success", true);
            body.put("message", "Patient registered successfully. Verification email sent.");
            body.put("data", response);
            return ResponseEntity.status(HttpStatus.CREATED).body(body);
        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Validation failed");
            error.put("errors", ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
        }
    }
} 