package com.example.bookstore.controller;

import com.example.bookstore.dto.AuthResponse;
import com.example.bookstore.dto.LoginRequest;
import com.example.bookstore.dto.SignUpRequest;
import com.example.bookstore.model.Role;
import com.example.bookstore.model.User;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsService userDetailsService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.username());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody SignUpRequest signUpRequest) {
        // Check if username already exists
        Optional<User> existingUser = userRepository.findByUsername(signUpRequest.username());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Check if email already exists
        Optional<User> existingEmail = userRepository.findByEmail(signUpRequest.email());
        if (existingEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        // Create new user
        User newUser = new User();
        newUser.setUsername(signUpRequest.username());
        newUser.setEmail(signUpRequest.email());
        newUser.setPassword(passwordEncoder.encode(signUpRequest.password()));
        newUser.setRoles(Set.of(Role.ROLE_USER));

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully");
    }
}
