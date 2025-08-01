package com.healthcare.provider.service;

import com.healthcare.provider.entity.AppointmentSlot;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentSlotService {
    AppointmentSlot getSlot(UUID slotId);
    List<AppointmentSlot> getSlotsByProvider(UUID providerId, ZonedDateTime start, ZonedDateTime end);
    AppointmentSlot updateSlot(UUID slotId, AppointmentSlot slotUpdate);
    void deleteSlot(UUID slotId, boolean deleteRecurring, String reason);
    // Booking integration methods can be added here
} 