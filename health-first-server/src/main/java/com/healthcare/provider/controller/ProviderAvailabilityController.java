package com.healthcare.provider.controller;

import com.healthcare.provider.dto.ProviderAvailabilityRequest;
import com.healthcare.provider.dto.ProviderAvailabilityResponse;
import com.healthcare.provider.service.ProviderAvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/provider/availability")
@RequiredArgsConstructor
@Tag(name = "Provider Availability", description = "Manage provider availability and slots")
public class ProviderAvailabilityController {
    private final ProviderAvailabilityService availabilityService;

    @PostMapping
    @Operation(summary = "Create provider availability")
    public ResponseEntity<ProviderAvailabilityResponse> create(@RequestParam UUID providerId, @Valid @RequestBody ProviderAvailabilityRequest request) {
        return ResponseEntity.ok(availabilityService.createAvailability(providerId, request));
    }

    @PutMapping("/{availabilityId}")
    @Operation(summary = "Update provider availability")
    public ResponseEntity<ProviderAvailabilityResponse> update(@RequestParam UUID providerId, @PathVariable UUID availabilityId, @Valid @RequestBody ProviderAvailabilityRequest request) {
        return ResponseEntity.ok(availabilityService.updateAvailability(providerId, availabilityId, request));
    }

    @DeleteMapping("/{availabilityId}")
    @Operation(summary = "Delete provider availability")
    public ResponseEntity<Void> delete(@RequestParam UUID providerId, @PathVariable UUID availabilityId, @RequestParam(defaultValue = "false") boolean deleteRecurring, @RequestParam(required = false) String reason) {
        availabilityService.deleteAvailability(providerId, availabilityId, deleteRecurring, reason);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{availabilityId}")
    @Operation(summary = "Get provider availability by ID")
    public ResponseEntity<ProviderAvailabilityResponse> get(@RequestParam UUID providerId, @PathVariable UUID availabilityId) {
        return ResponseEntity.ok(availabilityService.getAvailability(providerId, availabilityId));
    }

    @GetMapping
    @Operation(summary = "Get provider availabilities in date range")
    public ResponseEntity<List<ProviderAvailabilityResponse>> getAll(@RequestParam UUID providerId, @RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam(required = false) String status, @RequestParam(required = false) String appointmentType, @RequestParam(required = false) String timezone) {
        return ResponseEntity.ok(availabilityService.getAvailabilities(providerId, startDate, endDate, status, appointmentType, timezone));
    }
} 