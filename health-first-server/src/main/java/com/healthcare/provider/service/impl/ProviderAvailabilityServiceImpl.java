package com.healthcare.provider.service.impl;

import com.healthcare.provider.dto.ProviderAvailabilityRequest;
import com.healthcare.provider.dto.ProviderAvailabilityResponse;
import com.healthcare.provider.entity.AppointmentSlot;
import com.healthcare.provider.entity.Provider;
import com.healthcare.provider.entity.ProviderAvailability;
import com.healthcare.provider.repository.AppointmentSlotRepository;
import com.healthcare.provider.repository.ProviderAvailabilityRepository;
import com.healthcare.provider.repository.ProviderRepository;
import com.healthcare.provider.service.ProviderAvailabilityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProviderAvailabilityServiceImpl implements ProviderAvailabilityService {
    private final ProviderAvailabilityRepository availabilityRepo;
    private final AppointmentSlotRepository slotRepo;
    private final ProviderRepository providerRepo;

    @Override
    @Transactional
    public ProviderAvailabilityResponse createAvailability(UUID providerId, ProviderAvailabilityRequest request) {
        Provider provider = providerRepo.findById(providerId).orElseThrow();
        ProviderAvailability availability = ProviderAvailability.builder()
                .provider(provider)
                .date(request.getDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .timezone(request.getTimezone())
                .isRecurring(request.isRecurring())
                .recurrencePattern(request.getRecurrencePattern() != null ? ProviderAvailability.RecurrencePattern.valueOf(request.getRecurrencePattern().toUpperCase()) : null)
                .recurrenceEndDate(request.getRecurrenceEndDate())
                .slotDuration(request.getSlotDuration())
                .breakDuration(request.getBreakDuration())
                .appointmentType(request.getAppointmentType() != null ? ProviderAvailability.AppointmentType.valueOf(request.getAppointmentType().toUpperCase()) : ProviderAvailability.AppointmentType.CONSULTATION)
                .location(mapLocation(request.getLocation()))
                .pricing(mapPricing(request.getPricing()))
                .specialRequirements(request.getSpecialRequirements())
                .notes(request.getNotes())
                .build();
        // Conflict check: prevent overlapping slots for same provider
        if (hasConflict(provider, request)) {
            throw new IllegalArgumentException("Overlapping availability exists for this provider.");
        }
        availability = availabilityRepo.save(availability);
        List<AppointmentSlot> slots = generateSlots(availability);
        slotRepo.saveAll(slots);
        return mapToResponse(availability, slots);
    }

    @Override
    public List<ProviderAvailabilityResponse> getAvailabilities(UUID providerId, LocalDate startDate, LocalDate endDate, String status, String appointmentType, String timezone) {
        Provider provider = providerRepo.findById(providerId).orElseThrow();
        List<ProviderAvailability> availabilities;
        if (status != null) {
            availabilities = availabilityRepo.findByProviderAndDateBetweenAndStatus(
                provider, startDate, endDate, ProviderAvailability.SlotStatus.valueOf(status.toUpperCase()));
        } else {
            availabilities = availabilityRepo.findByProviderAndDateBetween(provider, startDate, endDate);
        }
        // For each availability, fetch slots and map to response
        return availabilities.stream()
            .map(avail -> {
                List<AppointmentSlot> slots = slotRepo.findByAvailability(avail);
                return mapToResponse(avail, slots);
            })
            .toList();
    }

    @Override
    public ProviderAvailabilityResponse getAvailability(UUID providerId, UUID availabilityId) {
        Provider provider = providerRepo.findById(providerId).orElseThrow();
        ProviderAvailability availability = availabilityRepo.findById(availabilityId)
            .filter(a -> a.getProvider().getId().equals(providerId))
            .orElseThrow();
        List<AppointmentSlot> slots = slotRepo.findByAvailability(availability);
        return mapToResponse(availability, slots);
    }

    @Override
    @Transactional
    public ProviderAvailabilityResponse updateAvailability(UUID providerId, UUID availabilityId, ProviderAvailabilityRequest request) {
        Provider provider = providerRepo.findById(providerId).orElseThrow();
        ProviderAvailability availability = availabilityRepo.findById(availabilityId)
            .filter(a -> a.getProvider().getId().equals(providerId))
            .orElseThrow();
        // Update fields
        availability.setDate(request.getDate());
        availability.setStartTime(request.getStartTime());
        availability.setEndTime(request.getEndTime());
        availability.setTimezone(request.getTimezone());
        availability.setRecurring(request.isRecurring());
        availability.setRecurrencePattern(request.getRecurrencePattern() != null ? ProviderAvailability.RecurrencePattern.valueOf(request.getRecurrencePattern().toUpperCase()) : null);
        availability.setRecurrenceEndDate(request.getRecurrenceEndDate());
        availability.setSlotDuration(request.getSlotDuration());
        availability.setBreakDuration(request.getBreakDuration());
        availability.setAppointmentType(request.getAppointmentType() != null ? ProviderAvailability.AppointmentType.valueOf(request.getAppointmentType().toUpperCase()) : ProviderAvailability.AppointmentType.CONSULTATION);
        availability.setLocation(mapLocation(request.getLocation()));
        availability.setPricing(mapPricing(request.getPricing()));
        availability.setSpecialRequirements(request.getSpecialRequirements());
        availability.setNotes(request.getNotes());
        // Remove old slots and generate new ones
        slotRepo.deleteAll(slotRepo.findByAvailability(availability));
        List<AppointmentSlot> slots = generateSlots(availability);
        slotRepo.saveAll(slots);
        availabilityRepo.save(availability);
        return mapToResponse(availability, slots);
    }

    @Override
    public void deleteAvailability(UUID providerId, UUID availabilityId, boolean deleteRecurring, String reason) {
        Provider provider = providerRepo.findById(providerId).orElseThrow();
        ProviderAvailability availability = availabilityRepo.findById(availabilityId)
            .filter(a -> a.getProvider().getId().equals(providerId))
            .orElseThrow();
        // If deleteRecurring, delete all recurring availabilities in the series
        if (deleteRecurring && availability.isRecurring() && availability.getRecurrencePattern() != null && availability.getRecurrenceEndDate() != null) {
            List<ProviderAvailability> recurring = availabilityRepo.findByProviderAndDateBetween(
                provider, availability.getDate(), availability.getRecurrenceEndDate());
            for (ProviderAvailability avail : recurring) {
                slotRepo.deleteAll(slotRepo.findByAvailability(avail));
                availabilityRepo.delete(avail);
            }
        } else {
            slotRepo.deleteAll(slotRepo.findByAvailability(availability));
            availabilityRepo.delete(availability);
        }
        // Optionally log the reason for deletion
    }

    // ... Implement updateAvailability, deleteAvailability, getAvailability, getAvailabilities ...
    // ... Helper methods for slot generation, recurrence, time zone, and mapping ...

    private boolean hasConflict(Provider provider, ProviderAvailabilityRequest request) {
        List<ProviderAvailability> existing = availabilityRepo.findByProviderAndDateBetween(
                provider, request.getDate(), request.getRecurrenceEndDate() != null ? request.getRecurrenceEndDate() : request.getDate());
        for (ProviderAvailability avail : existing) {
            if (avail.getStartTime().isBefore(request.getEndTime()) && avail.getEndTime().isAfter(request.getStartTime())) {
                return true;
            }
        }
        return false;
    }

    private List<AppointmentSlot> generateSlots(ProviderAvailability availability) {
        List<AppointmentSlot> slots = new ArrayList<>();
        LocalDate startDate = availability.getDate();
        LocalDate endDate = availability.isRecurring() && availability.getRecurrenceEndDate() != null ? availability.getRecurrenceEndDate() : startDate;
        for (LocalDate date = startDate; !date.isAfter(endDate); date = nextRecurrence(date, availability.getRecurrencePattern())) {
            LocalTime slotStart = availability.getStartTime();
            LocalTime slotEnd = availability.getEndTime();
            while (slotStart.plusMinutes(availability.getSlotDuration()).isBefore(slotEnd) || slotStart.plusMinutes(availability.getSlotDuration()).equals(slotEnd)) {
                ZonedDateTime slotStartZdt = ZonedDateTime.of(date, slotStart, ZoneId.of(availability.getTimezone())).withZoneSameInstant(ZoneOffset.UTC);
                ZonedDateTime slotEndZdt = slotStartZdt.plusMinutes(availability.getSlotDuration());
                slots.add(AppointmentSlot.builder()
                        .availability(availability)
                        .provider(availability.getProvider())
                        .slotStartTime(slotStartZdt)
                        .slotEndTime(slotEndZdt)
                        .status(AppointmentSlot.SlotStatus.AVAILABLE)
                        .appointmentType(availability.getAppointmentType().name())
                        .bookingReference(UUID.randomUUID().toString())
                        .build());
                slotStart = slotStart.plusMinutes(availability.getSlotDuration() + availability.getBreakDuration());
            }
        }
        return slots;
    }

    private LocalDate nextRecurrence(LocalDate date, ProviderAvailability.RecurrencePattern pattern) {
        if (pattern == null) return date.plusDays(1); // default daily
        switch (pattern) {
            case DAILY: return date.plusDays(1);
            case WEEKLY: return date.plusWeeks(1);
            case MONTHLY: return date.plusMonths(1);
            default: return date.plusDays(1);
        }
    }

    private ProviderAvailability.Location mapLocation(ProviderAvailabilityRequest.Location loc) {
        if (loc == null) return null;
        ProviderAvailability.Location l = new ProviderAvailability.Location();
        l.setType(ProviderAvailability.Location.LocationType.valueOf(loc.getType().toUpperCase()));
        l.setAddress(loc.getAddress());
        l.setRoomNumber(loc.getRoomNumber());
        return l;
    }
    private ProviderAvailability.Pricing mapPricing(ProviderAvailabilityRequest.Pricing p) {
        if (p == null) return null;
        ProviderAvailability.Pricing pr = new ProviderAvailability.Pricing();
        pr.setBaseFee(p.getBaseFee());
        pr.setInsuranceAccepted(p.getInsuranceAccepted());
        pr.setCurrency(p.getCurrency());
        return pr;
    }
    private ProviderAvailabilityResponse mapToResponse(ProviderAvailability availability, List<AppointmentSlot> slots) {
        return ProviderAvailabilityResponse.builder()
                .availabilityId(availability.getId())
                .providerId(availability.getProvider().getId())
                .date(availability.getDate())
                .startTime(availability.getStartTime())
                .endTime(availability.getEndTime())
                .timezone(availability.getTimezone())
                .isRecurring(availability.isRecurring())
                .recurrencePattern(availability.getRecurrencePattern() != null ? availability.getRecurrencePattern().name().toLowerCase() : null)
                .recurrenceEndDate(availability.getRecurrenceEndDate())
                .slotDuration(availability.getSlotDuration())
                .breakDuration(availability.getBreakDuration())
                .status(availability.getStatus().name().toLowerCase())
                .maxAppointmentsPerSlot(availability.getMaxAppointmentsPerSlot())
                .currentAppointments(availability.getCurrentAppointments())
                .appointmentType(availability.getAppointmentType().name().toLowerCase())
                .location(mapLocationDto(availability.getLocation()))
                .pricing(mapPricingDto(availability.getPricing()))
                .notes(availability.getNotes())
                .specialRequirements(availability.getSpecialRequirements())
                .slots(slots.stream().map(this::mapSlotDto).collect(Collectors.toList()))
                .build();
    }
    private ProviderAvailabilityResponse.Location mapLocationDto(ProviderAvailability.Location loc) {
        if (loc == null) return null;
        return ProviderAvailabilityResponse.Location.builder()
                .type(loc.getType().name().toLowerCase())
                .address(loc.getAddress())
                .roomNumber(loc.getRoomNumber())
                .build();
    }
    private ProviderAvailabilityResponse.Pricing mapPricingDto(ProviderAvailability.Pricing p) {
        if (p == null) return null;
        return ProviderAvailabilityResponse.Pricing.builder()
                .baseFee(p.getBaseFee())
                .insuranceAccepted(p.getInsuranceAccepted())
                .currency(p.getCurrency())
                .build();
    }
    private ProviderAvailabilityResponse.Slot mapSlotDto(AppointmentSlot slot) {
        return ProviderAvailabilityResponse.Slot.builder()
                .slotId(slot.getId())
                .startTime(slot.getSlotStartTime().toString())
                .endTime(slot.getSlotEndTime().toString())
                .status(slot.getStatus().name().toLowerCase())
                .appointmentType(slot.getAppointmentType())
                .build();
    }
} 