package com.healthcare.provider.repository;

import com.healthcare.provider.entity.AppointmentSlot;
import com.healthcare.provider.entity.Provider;
import com.healthcare.provider.entity.ProviderAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, UUID> {
    List<AppointmentSlot> findByProvider(Provider provider);
    List<AppointmentSlot> findByAvailability(ProviderAvailability availability);
    List<AppointmentSlot> findBySlotStartTimeBetween(ZonedDateTime start, ZonedDateTime end);
    List<AppointmentSlot> findByStatus(AppointmentSlot.SlotStatus status);
    List<AppointmentSlot> findByProviderAndSlotStartTimeBetween(Provider provider, ZonedDateTime start, ZonedDateTime end);
    List<AppointmentSlot> findByProviderAndStatus(Provider provider, AppointmentSlot.SlotStatus status);
} 