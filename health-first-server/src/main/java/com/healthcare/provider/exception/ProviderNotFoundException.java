package com.healthcare.provider.exception;

public class ProviderNotFoundException extends RuntimeException {
    public ProviderNotFoundException(String message) {
        super(message);
    }
    public ProviderNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
} 