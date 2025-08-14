import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import api from '../services/api';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, IconButton, Tooltip, Stack, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// --- THIS IS THE FIX ---
// 1. Define the base API URL using the environment variable, just like in the other files.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ReadBookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [epubData, setEpubData] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading book details...');
    const [errorMessage, setErrorMessage] = useState('');
    const [location, setLocation] = useState(localStorage.getItem(`book-progress-${id}`) || null);
    const [fontSize, setFontSize] = useState(100);
    const readerRef = useRef(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoadingMessage('Loading book details...');
                setErrorMessage('');
                // This 'api.get' call is likely already correct if you have a central api service file
                const response = await api.get(`/books/${id}`);
                const bookData = response.data;
                setBook(bookData);

                if (bookData && bookData.contentUrl) {
                    setLoadingMessage('Downloading e-book (this may take a moment)...');

                    // --- THIS LINE IS NOW CORRECTED ---
                    // 2. It now uses the API_URL variable instead of the hardcoded localhost.
                    const proxyUrl = `${API_URL}/api/books/proxy-epub?url=${encodeURIComponent(bookData.contentUrl)}`;

                    const epubResponse = await axios.get(proxyUrl, {
                        responseType: 'arraybuffer',
                        timeout: 30000,
                    });

                    setEpubData(epubResponse.data);
                } else {
                    setEpubData(null);
                }
            } catch (error) {
                console.error("Error fetching book:", error);
                if (error.code === 'ECONNABORTED') {
                    setErrorMessage('The e-book download timed out. The file may be too large or the network is slow. Please try again later.');
                } else {
                    setErrorMessage('Failed to load the book. Please check the console for details.');
                }
                setBook(null);
            } finally {
                setLoadingMessage('');
            }
        };
        fetchBook();
    }, [id]);

    const handleLocationChanged = (epubcifi) => {
        localStorage.setItem(`book-progress-${id}`, epubcifi);
        setLocation(epubcifi);
    };

    const changeFontSize = (newSize) => {
        setFontSize(newSize);
        if(readerRef.current) {
            readerRef.current.themes.fontSize(`${newSize}%`);
        }
    };

    if (loadingMessage) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>{loadingMessage}</Typography>
            </Box>
        );
    }

    // ... the rest of your component is correct and does not need changes ...
    if (errorMessage) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{errorMessage}</Alert>
            </Box>
        );
    }

    if (!book || !epubData) {
        return <div className="text-center mt-5"><h2>Sorry, this book is not available for reading.</h2></div>;
    }

    return (
        <div>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    {book.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mx: 2 }}>
                    <Tooltip title="Decrease font size">
                        <IconButton onClick={() => changeFontSize(Math.max(80, fontSize - 10))}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography>{fontSize}%</Typography>
                    <Tooltip title="Increase font size">
                        <IconButton onClick={() => changeFontSize(Math.min(130, fontSize + 10))}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Button
                    variant="contained"
                    href={book.contentUrl}
                    download
                >
                    Download EPUB
                </Button>
            </Box>

            <div style={{ height: 'calc(100vh - 81px)' }}>
                <ReactReader
                    location={location}
                    locationChanged={handleLocationChanged}
                    url={epubData}
                    getRendition={(rendition) => {
                        readerRef.current = rendition;
                        rendition.themes.fontSize(`${fontSize}%`);
                    }}
                />
            </div>
        </div>
    );
};

export default ReadBookPage;