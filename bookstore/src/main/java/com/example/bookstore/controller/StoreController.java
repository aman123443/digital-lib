package com.example.bookstore.controller;

import com.example.bookstore.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
public class StoreController {

    @Autowired
    private StoreService storeService;

    // This method is now a standard, non-reactive (no Mono) endpoint
    @GetMapping("/search")
    public ResponseEntity<String> searchStore(@RequestParam String query) {
        String results = storeService.searchBooks(query);
        return ResponseEntity.ok(results);
    }
}
