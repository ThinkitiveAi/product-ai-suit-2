package com.healthcare.provider.controller;

import com.healthcare.provider.dto.ProviderCreateRequest;
import com.healthcare.provider.dto.ProviderLoginRequest;
import com.healthcare.provider.service.dto.ProviderLoginResponse;
import com.healthcare.provider.service.ProviderService;
import com.healthcare.provider.service.dto.ProviderRegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/provider")
@RequiredArgsConstructor
public class ProviderController {
    private final ProviderService providerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerProvider(@Valid @RequestBody ProviderCreateRequest request) {
        ProviderRegistrationResponse response = providerService.registerProvider(request);
        Map<String, Object> body = new HashMap<>();
        body.put("success", true);
        body.put("message", "Provider registered successfully. Verification email sent.");
        body.put("data", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginProvider(@Valid @RequestBody ProviderLoginRequest request) {
        ProviderLoginResponse response = providerService.loginProvider(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
} 