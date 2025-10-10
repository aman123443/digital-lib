package com.example.bookstore.repository;

import com.example.bookstore.model.UserBook;
import com.example.bookstore.model.UserBookId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, UserBookId> {
    List<UserBook> findByUser_Username(String username);
}