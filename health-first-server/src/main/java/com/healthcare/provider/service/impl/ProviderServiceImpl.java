package com.healthcare.provider.service.impl;

import com.healthcare.provider.dto.ProviderCreateRequest;
import com.healthcare.provider.entity.Provider;
import com.healthcare.provider.repository.ProviderRepository;
import com.healthcare.provider.service.ProviderService;
import com.healthcare.provider.service.dto.ProviderRegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.healthcare.provider.exception.ProviderNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.healthcare.provider.dto.ProviderLoginRequest;
import com.healthcare.provider.service.dto.ProviderLoginResponse;
import com.healthcare.provider.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements ProviderService {
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public ProviderRegistrationResponse registerProvider(ProviderCreateRequest request) {
        // Password match validation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        // Duplicate checks
        if (providerRepository.existsByEmail(request.getEmail())) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        if (providerRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        if (providerRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new DataIntegrityViolationException("License number already exists");
        }
        // Hash password
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        // Map DTO to entity
        Provider provider = Provider.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(hashedPassword)
                .specialization(request.getSpecialization())
                .licenseNumber(request.getLicenseNumber())
                .yearsOfExperience(request.getYearsOfExperience())
                .clinicAddress(Provider.ClinicAddress.builder()
                        .street(request.getClinicAddress().getStreet())
                        .city(request.getClinicAddress().getCity())
                        .state(request.getClinicAddress().getState())
                        .zip(request.getClinicAddress().getZip())
                        .build())
                .verificationStatus(Provider.VerificationStatus.PENDING)
                .isActive(true)
                .build();
        // Save provider
        provider = providerRepository.save(provider);
        // (Stub) Send verification email
        // TODO: Implement email sending
        // Return response DTO
        return ProviderRegistrationResponse.builder()
                .providerId(provider.getId())
                .email(provider.getEmail())
                .verificationStatus(provider.getVerificationStatus())
                .build();
    }

    @Override
    public ProviderLoginResponse loginProvider(ProviderLoginRequest request) {
        Provider provider = providerRepository.findByEmail(request.getEmail())
                .orElse(null);
        System.out.println("provider: " + provider);
        if (provider == null || !passwordEncoder.matches(request.getPassword(), provider.getPasswordHash())) {
            return ProviderLoginResponse.builder()
                    .success(false)
                    .message("Invalid credentials")
                    .data(null)
                    .build();
        }
        // if (!provider.isActive() || provider.getVerificationStatus() != Provider.VerificationStatus.VERIFIED) {
        //     return ProviderLoginResponse.builder()
        //             .success(false)
        //             .message("Account not active or not verified")
        //             .data(null)
        //             .build();
        // }
        String token = jwtTokenProvider.generateToken(provider);
        return ProviderLoginResponse.builder()
                .success(true)
                .message("Login successful")
                .data(ProviderLoginResponse.Data.builder()
                        .accessToken(token)
                        .expiresIn((int) jwtTokenProvider.getJwtExpiryMs() / 1000)
                        .tokenType("Bearer")
                        .provider(provider)
                        .build())
                .build();
    }
} 