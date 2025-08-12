import React from 'react';
import { Grid, Box, Typography, TextField } from '@mui/material';
import axios from 'axios';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

const ReadingLibrary = () => {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/books/public')
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
          // This now uses the correct Grid v2 syntax
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
