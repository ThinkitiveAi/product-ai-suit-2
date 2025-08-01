package com.healthcare.provider.dto;

import com.healthcare.provider.entity.Provider;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderLoginResponse {
    private boolean success;
    private String message;
    private Data data;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Data {
        private String accessToken;
        private int expiresIn;
        private String tokenType;
        private Provider provider;
    }
} 