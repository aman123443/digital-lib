package com.example.bookstore.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfig {

    /**
     * Creates a shared RestTemplate bean with proper timeouts.
     * This is the standard Spring Boot way to make external API calls.
     */
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                // Timeout for establishing a connection to the external server
                .setConnectTimeout(Duration.ofSeconds(10))
                // Timeout for waiting for data to be returned from the server
                .setReadTimeout(Duration.ofSeconds(30))
                .build();
    }
}
