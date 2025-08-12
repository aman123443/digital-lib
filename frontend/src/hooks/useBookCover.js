import { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage from '../assets/placeholder.png'; // Our guaranteed fallback

const GOOGLE_BOOKS_API_KEY = 'AIzaSyB9FDJA6UWQEnwcl3ecl89c3fJF9JAvc9M'; // <-- PASTE YOUR KEY HERE

export const useBookCover = (isbn) => {
  const [coverUrl, setCoverUrl] = useState(placeholderImage); // Start with the placeholder

  useEffect(() => {
    if (!isbn) {
      setCoverUrl(placeholderImage);
      return;
    }

    let isMounted = true;

    const findCover = async () => {
      // Attempt 1: Fast and direct (Open Library)
      const openLibraryUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

      const image = new Image();
      image.src = openLibraryUrl;

      image.onload = () => {
        if (isMounted) {
          // If image loads and is not a tiny 1x1 pixel image (a common "not found" trick)
          if (image.height > 10) {
            setCoverUrl(openLibraryUrl);
          } else {
            fetchFromGoogleBooks();
          }
        }
      };

      image.onerror = () => {
        // If Open Library fails, try Google Books
        fetchFromGoogleBooks();
      };

      const fetchFromGoogleBooks = async () => {
        try {
          // Attempt 2: Slower API call, but more reliable (Google Books)
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`);
          const googleCover = response.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
          if (isMounted && googleCover) {
            setCoverUrl(googleCover);
          } else if (isMounted) {
            // Final Fallback if Google also has no cover
            setCoverUrl(placeholderImage);
          }
        } catch (error) {
          console.error("Google Books API error for ISBN:", isbn, error);
          if (isMounted) {
            setCoverUrl(placeholderImage);
          }
        }
      };
    };

    findCover();

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted components
    };
  }, [isbn]);

  return coverUrl;
};