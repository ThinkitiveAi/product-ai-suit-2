package com.healthcare.provider.security;

import com.healthcare.provider.entity.Provider;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secret:defaultSecretKey12345678901234567890}")
    private String jwtSecret;

    @Value("${jwt.expiry:3600000}")
    private long jwtExpiryMs;

    public String generateToken(Provider provider) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiryMs);
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.builder()
                .setSubject(provider.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .claim("email", provider.getEmail())
                .claim("role", "PROVIDER")
                .claim("specialization", provider.getSpecialization())
                .claim("verification_status", provider.getVerificationStatus().name())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public UUID getProviderIdFromToken(String token) {
        Claims claims = getClaims(token);
        return UUID.fromString(claims.getSubject());
    }

    public Claims getClaims(String token) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public long getJwtExpiryMs() {
        return jwtExpiryMs;
    }

    public String generateTokenForPatient(com.healthcare.provider.entity.Patient patient, int expirySeconds) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirySeconds * 1000L);
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.builder()
                .setSubject(patient.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .claim("email", patient.getEmail())
                .claim("role", patient.getRole())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
} 