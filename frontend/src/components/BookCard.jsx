import React, { useState, useContext } from 'react';
// --- THIS IS THE CORRECTED LINE ---
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Menu, MenuItem, IconButton, Tooltip, Box } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DownloadIcon from '@mui/icons-material/Download';
import { AuthContext } from '../context/AuthContext';
import { addBookToLibrary } from '../services/bookService';

const BookCard = ({ book }) => {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAddToList = async (shelfStatus) => {
        try {
            await addBookToLibrary({ bookId: book.id, shelf: shelfStatus });
            alert(`Added '${book.title}' to your library!`);
        } catch (error) {
            console.error("Failed to add book", error);
            alert("Failed to add book. You may have already added it.");
        }
        handleClose();
    };

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
        }}>
            <CardMedia
                component="img"
                sx={{ height: 280, objectFit: 'cover' }}
                image={book.contentUrl || '/placeholder-book-cover.jpg'}
                alt={book.title}
            />
            <CardContent sx={{ flexGrow: 1, paddingBottom: 0 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap sx={{ fontWeight: 600 }}>
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    by {book.author || 'Unknown Author'}
                </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 16px' }}>
                
                <Box>
                    <Tooltip title="Read Book">
                        <IconButton component="a" href={book.readUrl} target="_blank" rel="noopener noreferrer">
                            <ReadMoreIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                         <IconButton component="a" href={book.readUrl} target="_blank" rel="noopener noreferrer">
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {user ? (
                    <div>
                        <Button variant="contained" size="small" onClick={handleClick}>
                            + Add to Library
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => handleAddToList('WANT_TO_READ')}>Want to Read</MenuItem>
                            <MenuItem onClick={() => handleAddToList('READING')}>Currently Reading</MenuItem>
                            <MenuItem onClick={() => handleAddToList('FINISHED')}>Finished</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Tooltip title="Login to save books">
                        <span> 
                            <Button variant="contained" size="small" disabled>
                                + Add to Library
                            </Button>
                        </span>
                    </Tooltip>
                )}
            </CardActions>
        </Card>
    );
};

export default BookCard;