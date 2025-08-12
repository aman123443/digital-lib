import React, { useState } from 'react';
// CircularProgress has been removed from this import line
import { Box, TextField, Button, Grid, Card, CardMedia, CardContent, Typography, Alert, CardActions, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../services/api';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// A new component for the professional skeleton loading effect
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
            const response = await api.get(`/store/search?query=${query}`);
            const data = response.data;

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
                        placeholder="Search for any book to buy..."
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
                                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                                            <Button size="small" href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" variant="outlined">
                                                Google Play
                                            </Button>
                                            <Button size="small" href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" rel="noopener noreferrer" variant="outlined" color="secondary">
                                                Amazon
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
