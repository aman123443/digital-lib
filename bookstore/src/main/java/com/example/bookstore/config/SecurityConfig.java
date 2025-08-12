package com.example.bookstore.config;

import com.example.bookstore.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Use the custom CORS configuration defined below
                .cors(Customizer.withDefaults())
                // Disable CSRF protection for stateless REST APIs
                .csrf(csrf -> csrf.disable())
                // Configure authorization rules for your endpoints
                .authorizeHttpRequests(auth -> auth
                        // --- THIS IS THE UPDATED LINE ---
                        // We are adding "/api/v1/books/**" to the list of public URLs.
                        // The '/**' wildcard makes all sub-paths public as well (e.g., /api/v1/books/123)
                        .requestMatchers(
                                "/api/auth/**",       // Authentication endpoints (login, register)
                                "/api/v1/books/**",   // All book-related endpoints
                                "/api/books/public",  // Your existing public endpoints
                                "/api/books/proxy-epub"
                        ).permitAll()
                        // All other requests must be authenticated
                        .anyRequest().authenticated()
                )
                // Configure session management to be stateless, as we use JWTs
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Add your custom JWT filter to the security chain before the default username/password filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Set the allowed origins for your frontend applications
        configuration.setAllowedOrigins(Arrays.asList(
                "https://digital-library-eight-delta.vercel.app",
                "http://localhost:3000",
                "http://localhost:5173"
        ));
        // Set the allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this CORS configuration to all paths
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}