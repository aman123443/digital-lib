import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import api from '../services/api';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, IconButton, Tooltip, Stack, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ReadBookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [epubData, setEpubData] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading book details...');
    const [errorMessage, setErrorMessage] = useState('');

    // State for reader location (page), retrieved from local storage
    const [location, setLocation] = useState(localStorage.getItem(`book-progress-${id}`) || null);

    // State for font size
    const [fontSize, setFontSize] = useState(100);

    // Ref to access the reader's internal methods
    const readerRef = useRef(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoadingMessage('Loading book details...');
                setErrorMessage('');
                const response = await api.get(`/books/${id}`);
                const bookData = response.data;
                setBook(bookData);

                if (bookData && bookData.contentUrl) {
                    setLoadingMessage('Downloading e-book (this may take a moment)...');
                    const proxyUrl = `http://localhost:8080/api/books/proxy-epub?url=${encodeURIComponent(bookData.contentUrl)}`;

                    const epubResponse = await axios.get(proxyUrl, {
                        responseType: 'arraybuffer',
                        timeout: 30000, // 30 second timeout for large files
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

    // This function is called by the reader whenever the page changes
    const handleLocationChanged = (epubcifi) => {
        // Save the new location to local storage
        localStorage.setItem(`book-progress-${id}`, epubcifi);
        setLocation(epubcifi);
    };

    // Function to change the font size in the reader
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
            {/* Professional Header */}
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

                {/* Font Size Controls */}
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

            {/* The E-book Reader */}
            <div style={{ height: 'calc(100vh - 81px)' }}>
                <ReactReader
                    location={location}
                    locationChanged={handleLocationChanged}
                    url={epubData}
                    // This gets a ref to the epubjs instance so we can control it
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
