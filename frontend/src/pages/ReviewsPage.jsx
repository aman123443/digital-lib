import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, TextField, Button, Rating, Alert } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import { motion } from 'framer-motion';

// Sample reviews - later, this will come from your backend API
const sampleReviews = [
  { id: 1, name: 'Alex Johnson', rating: 5, comment: 'This platform is incredible! The AI recommendations are spot-on, and the e-book reader is a joy to use. A must-have for any book lover.' },
  { id: 2, name: 'Samantha Lee', rating: 4.5, comment: 'I love having a single place to read classics and find new books to buy. The dark mode is also beautifully implemented.' },
  { id: 3, name: 'David Chen', rating: 4, comment: 'A very solid application. The reading library is fantastic. I would love to see a feature to create personal bookshelves in the future!' },
];

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to your backend API
    console.log('Submitting review:', newReview);
    setSubmitted(true);
    // You could add the new review to the list here for immediate feedback
    // setReviews(prev => [...prev, { id: Date.now(), name: 'Your Name', ...newReview }]);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
            What Our Readers Are Saying
          </Typography>
        </motion.div>

        <Grid container spacing={3} sx={{ my: 4 }}>
          {reviews.map((review, index) => (
            <Grid item key={review.id} xs={12} md={4}>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}>
                <ReviewCard review={review} />
               </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <Paper sx={{ p: 4, mt: 6, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Leave a Review
            </Typography>
            {submitted ? (
              <Alert severity="success">Thank you for your feedback!</Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend">Your Rating</Typography>
                  <Rating
                    name="rating"
                    value={newReview.rating}
                    onChange={(event, newValue) => {
                      setNewReview({ ...newReview, rating: newValue });
                    }}
                  />
                </Box>
                <TextField
                  label="Your Comments"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" size="large">
                  Submit Review
                </Button>
              </form>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ReviewsPage;
