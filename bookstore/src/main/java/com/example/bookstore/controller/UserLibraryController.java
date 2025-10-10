package com.example.bookstore.controller;

import com.example.bookstore.dto.AddBookRequest;
import com.example.bookstore.dto.UserBookDTO;
import com.example.bookstore.service.UserLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/my-library")
@CrossOrigin(origins = {"https://digital-lib-ut2y.vercel.app", "http://localhost:3000", "http://localhost:5173"})
public class UserLibraryController {

    @Autowired
    private UserLibraryService userLibraryService;

    @PostMapping("/add")
    public ResponseEntity<?> addBookToLibrary(@RequestBody AddBookRequest request) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userLibraryService.addBookToUserLibrary(username, request.getBookId(), request.getShelf());
        return ResponseEntity.ok("Book added to library successfully.");
    }

    @GetMapping
    public ResponseEntity<List<UserBookDTO>> getUserLibrary() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        List<UserBookDTO> books = userLibraryService.getBooksForUser(username);
        return ResponseEntity.ok(books);
    }
}