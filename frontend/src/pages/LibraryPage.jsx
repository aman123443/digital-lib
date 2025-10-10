import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';

// Import the service and component
import { getPublicBooks } from '../services/bookService';
import BookCard from '../components/BookCard';

const LibraryPage = () => {
  // --- ADD STATE FOR DATA, LOADING, AND ERRORS ---
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- ADD useEffect TO FETCH DATA ON PAGE LOAD ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getPublicBooks();
        setBooks(response.data);
      } catch (err) {
        setError('Could not fetch the library. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Container sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Explore The Library
        </Typography>

        {/* --- ADD LOGIC TO DISPLAY LOADING, ERROR, OR BOOK GRID --- */}
        <Box sx={{ mt: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={4}>
              {books.map((book) => (
                <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </motion.div>
    </Container>
  );
};

export default LibraryPage;