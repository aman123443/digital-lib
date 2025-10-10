import api from './api'; // Your configured axios instance

// This is the base path for PUBLIC book endpoints
const PUBLIC_API_URL = '/v1/books'; 
// This is the base path for the USER'S PERSONAL library endpoints
const USER_API_URL = '/v1/my-library'; 

/**
 * Fetches the public list of all books from the backend.
 */
export const getPublicBooks = () => {
    return api.get(`${PUBLIC_API_URL}/public`);
};

/**
 * ADDS a book to the current user's library on a specific shelf.
 * @param { {bookId: number, shelf: string} } libraryData - The book ID and shelf status.
 */
export const addBookToLibrary = (libraryData) => {
    return api.post(`${USER_API_URL}/add`, libraryData);
};

/**
 * FETCHES all books in the current user's personal library.
 */
export const getUserLibrary = () => {
    return api.get(USER_API_URL);
};