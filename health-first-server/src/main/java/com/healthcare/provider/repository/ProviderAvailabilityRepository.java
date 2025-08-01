package com.healthcare.provider.repository;

import com.healthcare.provider.entity.ProviderAvailability;
import com.healthcare.provider.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ProviderAvailabilityRepository extends JpaRepository<ProviderAvailability, UUID> {
    List<ProviderAvailability> findByProvider(Provider provider);
    List<ProviderAvailability> findByProviderAndDateBetween(Provider provider, LocalDate start, LocalDate end);
    List<ProviderAvailability> findByProviderAndDateBetweenAndStatus(Provider provider, LocalDate start, LocalDate end, ProviderAvailability.SlotStatus status);
} 