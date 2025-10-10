import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
  // Function to get initials from a name for the avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card sx={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {getInitials(review.name)}
          </Avatar>
          <Box>
            <Typography variant="h6">{review.name}</Typography>
            <Rating value={review.rating} readOnly precision={0.5} />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          "{review.comment}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
