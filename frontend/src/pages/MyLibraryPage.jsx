import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, CircularProgress, Alert, Grid } from '@mui/material';
import BookCard from '../components/BookCard';
import { getUserLibrary } from '../services/bookService';

// Helper component to manage the content of each tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
        </div>
    );
}

const MyLibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await getUserLibrary();
                setBooks(response.data);
            } catch (err) {
                setError('Could not fetch your library. Please ensure you are logged in.');
            } finally {
                setLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // A function to filter the books based on the shelf status
    const filterBooksByShelf = (shelf) => {
        const filtered = books.filter(book => book.shelfStatus === shelf);
        if (filtered.length === 0) {
            return <Typography sx={{ textAlign: 'center', mt: 4 }}>This shelf is empty.</Typography>;
        }
        return (
            <Grid container spacing={4}>
                {filtered.map(book => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        );
    };
    
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                My Library
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                    <Tab label="Want to Read" />
                    <Tab label="Currently Reading" />
                    <Tab label="Finished" />
                </Tabs>
            </Box>

            <TabPanel value={selectedTab} index={0}>
                {filterBooksByShelf('WANT_TO_READ')}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                {filterBooksByShelf('READING')}
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
                {filterBooksByShelf('FINISHED')}
            </TabPanel>
        </Container>
    );
};

export default MyLibraryPage;