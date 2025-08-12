import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Use the new api service that includes auth headers
import authService from '../services/authService'; // Import auth service for logout

// This key is for Google's API, which is public, so it doesn't need the auth header.
// We'll still use the regular axios for this.
import axios from 'axios';
const GOOGLE_BOOKS_API_KEY = 'AIzaSyB9FDJA6UWQEnwcl3ecl89c3fJF9JAvc9M'; // <-- PASTE YOUR KEY HERE

const BookComponent = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const fetchBookCover = useCallback(async (isbn) => {
        const defaultCover = 'https://via.placeholder.com/128x192.png?text=No+Image';
        if (!isbn) return defaultCover;
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`);
            return response.data.items[0]?.volumeInfo?.imageLinks?.thumbnail || defaultCover;
        } catch (error) {
            console.error("Error fetching cover for ISBN:", isbn, error);
            return defaultCover;
        }
    }, []);

    const fetchBooks = useCallback(async () => {
        try {
            // Use the new 'api' service to make an authenticated request
            const response = await api.get('/books');
            const booksWithCovers = await Promise.all(response.data.map(async book => {
                const coverUrl = await fetchBookCover(book.isbn);
                return { ...book, coverUrl };
            }));
            setBooks(booksWithCovers);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }, [fetchBookCover]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleDelete = useCallback(async (id) => {
        // Use the new 'api' service
        await api.delete(`/books/${id}`);
        fetchBooks();
    }, [fetchBooks]);

    const handleSearch = useCallback(async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchQuery}&key=${GOOGLE_BOOKS_API_KEY}`);
            setSearchResults(response.data.items || []);
        } catch (error) {
            console.error("Error searching books:", error);
            setSearchResults([]);
        }
    }, [searchQuery]);

    const addBookToCollection = useCallback(async (bookInfo) => {
        const newBook = {
            title: bookInfo.title,
            author: bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author',
            isbn: bookInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier || '',
            description: bookInfo.description || ''
        };
        // Use the new 'api' service
        await api.post('/books', newBook);
        setSearchResults([]);
        setSearchQuery('');
        fetchBooks();
    }, [fetchBooks]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            {/* --- Header with Logout Button --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="m-0">My Bookstore</h1>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>

            {/* --- Search Form --- */}
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Search for a New Book</h2>
                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a book title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* --- Search Results --- */}
            {searchResults.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-center mb-4">Search Results</h2>
                    {searchResults.map(item => {
                        const bookInfo = item.volumeInfo;
                        return (
                            <div key={item.id} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-1">
                                        <img src={bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image'} className="img-fluid rounded-start m-2" alt="Book cover" />
                                    </div>
                                    <div className="col-md-11">
                                        <div className="card-body">
                                            <h5 className="card-title">{bookInfo.title}</h5>
                                            <p className="card-text"><small className="text-muted">{bookInfo.authors?.join(', ')}</small></p>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => addBookToCollection(bookInfo)}>
                                                Add to Collection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* --- Existing Book Collection --- */}
            <h2 className="text-center mb-4">Book Collection</h2>
            <div className="row">
                {books.map(book => (
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={book.id}>
                        <div className="card h-100 shadow-sm text-center">
                            <img src={book.coverUrl} className="card-img-top mx-auto mt-3" alt={book.title} style={{ width: '128px', height: '192px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text text-muted">{book.author}</p>
                                <p className="card-text"><small>ISBN: {book.isbn || 'N/A'}</small></p>
                                <div className="mt-auto pt-2">
                                    <a href={`/book/${book.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info me-2">
                                        Overview
                                    </a>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookComponent;