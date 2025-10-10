package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.model.User;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.UserRepository;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// --- THIS IS THE CORRECTED LINE ---
@RequestMapping("/api/v1/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * This is a public endpoint to get all books.
     * The full path will be: GET /api/v1/books/public
     */
    @GetMapping("/public")
    public List<Book> getPublicBooks() {
        return bookRepository.findAll();
    }

    /**
     * This is a protected endpoint to get books for the logged-in user.
     * The full path will be: GET /api/v1/books
     */
    @GetMapping
    public List<Book> getBooksForCurrentUser() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return bookRepository.findByUserUsername(username);
    }

    // ... rest of your controller methods are fine and do not need changes ...

    @GetMapping("/proxy-epub")
    public ResponseEntity<byte[]> proxyEpub(@RequestParam String url) {
        // Use a try-with-resources block to ensure the client is always closed
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet request = new HttpGet(url);
            // Execute the request and get the response
            return httpClient.execute(request, response -> {
                // Check if the download from Gutenberg was successful
                if (response.getCode() != 200) {
                    throw new RuntimeException("Failed to download EPUB, status code: " + response.getCode());
                }
                final byte[] content = EntityUtils.toByteArray(response.getEntity());
                return ResponseEntity.ok().body(content);
            });
        } catch (Exception e) {
            System.err.println("Failed to proxy EPUB from URL: " + url + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        book.setUser(currentUser);
        return bookRepository.save(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();
            if (existingBook.getUser() == null || !existingBook.getUser().getUsername().equals(username)) {
                return new ResponseEntity<>("You are not authorized to update this book.", HttpStatus.FORBIDDEN);
            }
            existingBook.setTitle(bookDetails.getTitle());
            existingBook.setAuthor(bookDetails.getAuthor());
            existingBook.setIsbn(bookDetails.getIsbn());
            existingBook.setDescription(bookDetails.getDescription());
            return ResponseEntity.ok(bookRepository.save(existingBook));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            if (book.getUser() == null || !book.getUser().getUsername().equals(username)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            bookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}