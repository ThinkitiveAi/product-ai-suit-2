package com.healthcare.provider.service.impl;

import com.healthcare.provider.dto.PatientCreateRequest;
import com.healthcare.provider.entity.Patient;
import com.healthcare.provider.repository.PatientRepository;
import com.healthcare.provider.service.PatientService;
import com.healthcare.provider.service.dto.PatientRegistrationResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final Validator validator;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Override
    @Transactional
    public PatientRegistrationResponse registerPatient(PatientCreateRequest request, String providerId) {
        // Validate DTO
        Set<ConstraintViolation<PatientCreateRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            Map<String, String> errors = new HashMap<>();
            for (ConstraintViolation<PatientCreateRequest> v : violations) {
                errors.put(v.getPropertyPath().toString(), v.getMessage());
            }
            throw new ConstraintViolationException(violations);
        }
        // Password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        // Password strength
        // Age >= 13
        if (request.getDateOfBirth() == null || Period.between(request.getDateOfBirth(), LocalDate.now()).getYears() < 13) {
            throw new IllegalArgumentException("Must be at least 13 years old");
        }
        // Gender enum
        try {
            Patient.Gender.valueOf(request.getGender().toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid gender value");
        }
        // Unique email/phone
        if (patientRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }
        if (patientRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already registered");
        }
        // Map DTO to entity
        Patient patient = Patient.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .gender(Patient.Gender.valueOf(request.getGender().toUpperCase()))
                .address(mapAddress(request.getAddress()))
                .emergencyContact(mapEmergencyContact(request.getEmergencyContact()))
                .medicalHistory(request.getMedicalHistory())
                .insuranceInfo(mapInsuranceInfo(request.getInsuranceInfo()))
                .emailVerified(false)
                .phoneVerified(false)
                .isActive(true)
                .build();
        patientRepository.save(patient);
        return PatientRegistrationResponse.builder()
                .patientId(patient.getId().toString())
                .email(patient.getEmail())
                .phoneNumber(patient.getPhoneNumber())
                .emailVerified(patient.isEmailVerified())
                .phoneVerified(patient.isPhoneVerified())
                .build();
    }

    private Patient.Address mapAddress(PatientCreateRequest.Address dto) {
        if (dto == null) return null;
        return Patient.Address.builder()
                .street(dto.getStreet())
                .city(dto.getCity())
                .state(dto.getState())
                .zip(dto.getZip())
                .build();
    }
    private Patient.EmergencyContact mapEmergencyContact(PatientCreateRequest.EmergencyContact dto) {
        if (dto == null) return null;
        return Patient.EmergencyContact.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .relationship(dto.getRelationship())
                .build();
    }
    private Patient.InsuranceInfo mapInsuranceInfo(PatientCreateRequest.InsuranceInfo dto) {
        if (dto == null) return null;
        return Patient.InsuranceInfo.builder()
                .provider(dto.getProvider())
                .policyNumber(dto.getPolicyNumber())
                .build();
    }
} 