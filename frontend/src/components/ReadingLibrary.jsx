import React from 'react';
import { Grid, Box, Typography, TextField } from '@mui/material';
import axios from 'axios';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

// --- THIS IS THE FIX ---
// 1. Define the base API URL using the environment variable.
//    This works for both production (Vercel) and local development.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ReadingLibrary = () => {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    // 2. Use the API_URL variable to construct the full request URL.
    axios.get(`${API_URL}/api/books/public`) // This line is now corrected
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the public books!", error);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reading Library
      </Typography>
      <TextField
        fullWidth
        label="Search by title or author"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filteredBooks.map(book => (
          <Grid key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
              <BookCard book={book} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReadingLibrary;