import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Your central axios instance from api.js

const ReadingLibrary = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        setLoading(true);
        setError('');

        // --- THIS IS THE CORRECTED LINE ---
        // The path now correctly starts with '/v1/books'.
        // Your central 'api.js' file automatically adds the '/api' prefix.
        const response = await api.get('/v1/books');

        setBooks(response.data);
      } catch (error) {
        console.error("There was an error fetching your books!", error);
        setError('Failed to fetch your library. You may need to log in again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading your library...</Typography>
        </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Reading Library
      </Typography>
      <TextField
        fullWidth
        label="Search your library by title or author"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filteredBooks.length > 0 ? filteredBooks.map(book => (
          <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">{book.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={`/read/${book.id}`}>Read</Button>
                    {book.contentUrl && (
                        <Button size="small" href={book.contentUrl} target="_blank" rel="noopener noreferrer" download>Download</Button>
                    )}
                </CardActions>
            </Card>
          </Grid>
        )) : (
            <Typography sx={{ mt: 2, ml: 1 }}>
                Your library is empty. Go to the 'Add Book' page to add some books!
            </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ReadingLibrary;