package com.healthcare.provider.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcare.provider.dto.ProviderCreateRequest;
import com.healthcare.provider.service.ProviderService;
import com.healthcare.provider.service.dto.ProviderRegistrationResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProviderController.class)
class ProviderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private ProviderService providerService;

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
    void registerProvider_success() throws Exception {
        ProviderRegistrationResponse response = ProviderRegistrationResponse.builder()
                .providerId(UUID.randomUUID())
                .email("john.doe@clinic.com")
                .verificationStatus(com.healthcare.provider.entity.Provider.VerificationStatus.PENDING)
                .build();
        Mockito.when(providerService.registerProvider(any())).thenReturn(response);
        mockMvc.perform(post("/api/v1/provider/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getValidRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("john.doe@clinic.com"));
    }

    @Test
    void registerProvider_validationError() throws Exception {
        ProviderCreateRequest invalid = getValidRequest();
        invalid.setEmail("not-an-email");
        mockMvc.perform(post("/api/v1/provider/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.email").exists());
    }
} 