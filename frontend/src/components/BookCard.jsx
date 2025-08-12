import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useBookCover } from '../hooks/useBookCover';

const BookCard = ({ book }) => {
  const coverUrl = useBookCover(book.isbn);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        transition: 'none', // Disable card hover animation
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Static hover effect
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 240, // Increased height for better visibility
          objectFit: 'contain',
          pt: 1,
          backgroundColor: '#f5f5f5', // Light background for missing images
        }}
        image={coverUrl || '/placeholder-book-cover.jpg'} // Fallback image
        alt={book.title}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          noWrap
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            color: '#333',
            lineHeight: 1.2,
          }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.9rem',
            color: '#666',
          }}
        >
          by {book.author || 'Unknown Author'}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontStyle: 'italic' }}
          >
            ISBN: {book.isbn || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;