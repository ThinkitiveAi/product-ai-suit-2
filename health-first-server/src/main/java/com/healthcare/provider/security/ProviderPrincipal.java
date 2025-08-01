package com.healthcare.provider.security;

import com.healthcare.provider.entity.Provider;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
public class ProviderPrincipal implements UserDetails {
    private final Provider provider;

    public ProviderPrincipal(Provider provider) {
        this.provider = provider;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_PROVIDER"));
    }

    @Override
    public String getPassword() {
        return provider.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return provider.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return provider.isActive() && provider.getVerificationStatus() == Provider.VerificationStatus.VERIFIED;
    }
} 