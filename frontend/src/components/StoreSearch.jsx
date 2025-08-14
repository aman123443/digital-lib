import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Card, CardMedia, CardContent, Typography, Alert, CardActions, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../services/api'; // Your central axios instance
import SearchOffIcon from '@mui/icons-material/SearchOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// Your professional skeleton loading effect - no changes needed here.
const SkeletonCard = () => (
    <Card>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width="60%" />
        </CardContent>
        <CardActions>
            <Skeleton variant="rounded" width="100%" height={30} />
        </CardActions>
    </Card>
);


const StoreSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError('');
        setSearched(true);
        setResults([]);

        try {
            // --- CHANGE 1: Corrected the Search URL ---
            // This now points to the '/api/v1/books/search' endpoint we created in your backend.
            const response = await api.get(`/api/v1/books/search?query=${query}`);

            // The response from our backend is a raw JSON string from Google, so we need to parse it.
            const data = JSON.parse(response.data);

            if (data.items) {
                setResults(data.items);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("Error searching store:", err);
            setError('Failed to fetch results from the store. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- CHANGE 2: Added the handleAddBook Function ---
    // This function sends the book data to your protected backend endpoint to save it.
    const handleAddBook = async (bookData) => {
        try {
            const bookToAdd = {
                title: bookData.volumeInfo.title,
                author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : 'Unknown Author',
                isbn: bookData.volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier,
                description: bookData.volumeInfo.description,
                contentUrl: bookData.accessInfo?.epub?.downloadLink,
                readUrl: bookData.volumeInfo?.previewLink
            };

            // Our 'api' instance automatically adds the JWT token for this protected request.
            await api.post('/api/v1/books', bookToAdd);
            alert(`'${bookToAdd.title}' was successfully added to your library!`);
        } catch (error) {
            console.error("Error adding book:", error);
            alert('Failed to add book. You must be logged in to do this.');
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
                Book Store
            </Typography>
            <form onSubmit={handleSearch}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for any book..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="contained" sx={{ ml: 1, px: 4 }} disabled={isLoading}>
                        Search
                    </Button>
                </Box>
            </form>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
                {error && <Alert severity="error">{error}</Alert>}

                {isLoading ? (
                    <Grid container spacing={3}>
                        {Array.from(new Array(8)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <SkeletonCard />
                            </Grid>
                        ))}
                    </Grid>
                ) : searched && results.length === 0 && !error ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <SearchOffIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                        <Typography variant="h6" color="text.secondary">
                            No books found for your search.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {results.map((book, index) => (
                            <Grid item key={book.id + index} xs={12} sm={6} md={4} lg={3}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: 6,
                                        }
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Cover'}
                                            alt={book.volumeInfo.title}
                                            sx={{ objectFit: 'contain', pt: 1 }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="div" noWrap title={book.volumeInfo.title}>
                                                {book.volumeInfo.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {book.volumeInfo.authors?.join(', ')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
                                            {/* --- CHANGE 3: Added the "Add to My Library" Button --- */}
                                            <Button
                                                size="small"
                                                onClick={() => handleAddBook(book)}
                                                variant="contained"
                                                startIcon={<AddCircleOutlineIcon />}
                                            >
                                                Add to Library
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default StoreSearch;