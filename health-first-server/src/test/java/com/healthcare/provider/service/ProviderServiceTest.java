package com.healthcare.provider.service;

import com.healthcare.provider.dto.ProviderCreateRequest;
import com.healthcare.provider.entity.Provider;
import com.healthcare.provider.repository.ProviderRepository;
import com.healthcare.provider.service.dto.ProviderRegistrationResponse;
import com.healthcare.provider.service.impl.ProviderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ProviderServiceTest {
    @Mock
    private ProviderRepository providerRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private ProviderServiceImpl providerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private ProviderCreateRequest getValidRequest() {
        return ProviderCreateRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@clinic.com")
                .phoneNumber("+1234567890")
                .password("SecurePassword123!")
                .confirmPassword("SecurePassword123!")
                .specialization("Cardiology")
                .licenseNumber("MD123456789")
                .yearsOfExperience(10)
                .clinicAddress(ProviderCreateRequest.ClinicAddress.builder()
                        .street("123 Medical Center Dr")
                        .city("New York")
                        .state("NY")
                        .zip("10001")
                        .build())
                .build();
    }

    @Test
    void registerProvider_success() {
        ProviderCreateRequest request = getValidRequest();
        when(providerRepository.existsByEmail(anyString())).thenReturn(false);
        when(providerRepository.existsByPhoneNumber(anyString())).thenReturn(false);
        when(providerRepository.existsByLicenseNumber(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed");
        Provider saved = Provider.builder()
                .id(UUID.randomUUID())
                .email(request.getEmail())
                .verificationStatus(Provider.VerificationStatus.PENDING)
                .build();
        when(providerRepository.save(any(Provider.class))).thenReturn(saved);
        ProviderRegistrationResponse response = providerService.registerProvider(request);
        assertNotNull(response);
        assertEquals(request.getEmail(), response.getEmail());
        assertEquals(Provider.VerificationStatus.PENDING, response.getVerificationStatus());
    }

    @Test
    void registerProvider_duplicateEmail() {
        ProviderCreateRequest request = getValidRequest();
        when(providerRepository.existsByEmail(anyString())).thenReturn(true);
        assertThrows(DataIntegrityViolationException.class, () -> providerService.registerProvider(request));
    }

    @Test
    void registerProvider_duplicatePhone() {
        ProviderCreateRequest request = getValidRequest();
        when(providerRepository.existsByEmail(anyString())).thenReturn(false);
        when(providerRepository.existsByPhoneNumber(anyString())).thenReturn(true);
        assertThrows(DataIntegrityViolationException.class, () -> providerService.registerProvider(request));
    }

    @Test
    void registerProvider_duplicateLicense() {
        ProviderCreateRequest request = getValidRequest();
        when(providerRepository.existsByEmail(anyString())).thenReturn(false);
        when(providerRepository.existsByPhoneNumber(anyString())).thenReturn(false);
        when(providerRepository.existsByLicenseNumber(anyString())).thenReturn(true);
        assertThrows(DataIntegrityViolationException.class, () -> providerService.registerProvider(request));
    }

    @Test
    void registerProvider_passwordMismatch() {
        ProviderCreateRequest request = getValidRequest();
        request.setConfirmPassword("WrongPassword");
        assertThrows(IllegalArgumentException.class, () -> providerService.registerProvider(request));
    }

    @Test
    void registerProvider_passwordIsHashed() {
        ProviderCreateRequest request = getValidRequest();
        when(providerRepository.existsByEmail(anyString())).thenReturn(false);
        when(providerRepository.existsByPhoneNumber(anyString())).thenReturn(false);
        when(providerRepository.existsByLicenseNumber(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed");
        Provider saved = Provider.builder()
                .id(UUID.randomUUID())
                .email(request.getEmail())
                .passwordHash("hashed")
                .verificationStatus(Provider.VerificationStatus.PENDING)
                .build();
        when(providerRepository.save(any(Provider.class))).thenReturn(saved);
        providerService.registerProvider(request);
        verify(passwordEncoder, times(1)).encode(eq(request.getPassword()));
    }
} 