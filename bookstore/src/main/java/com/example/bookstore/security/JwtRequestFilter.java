package com.example.bookstore.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        final String requestURI = request.getRequestURI();

        // --- THIS IS THE UPDATED LOGIC ---
        // A list of all public endpoints that should be ignored by the JWT filter.
        List<String> publicEndpoints = List.of(
                "/api/auth",
                "/api/v1/books",
                "/api/books/public",
                "/api/books/proxy-epub"
        );

        // Check if the current request URI starts with any of the public endpoint prefixes.
        boolean isPublicEndpoint = publicEndpoints.stream().anyMatch(requestURI::startsWith);

        if (isPublicEndpoint) {
            // If it's a public endpoint, skip the JWT validation and continue the filter chain.
            chain.doFilter(request, response);
            return;
        }


        // --- EXISTING JWT VALIDATION LOGIC FOR PROTECTED ENDPOINTS ---
        final String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7);
                username = jwtUtil.extractUsername(jwt);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken token =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
            }
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (MalformedJwtException | SignatureException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("Error processing JWT: {}", e.getMessage());
        }

        chain.doFilter(request, response);
    }
}