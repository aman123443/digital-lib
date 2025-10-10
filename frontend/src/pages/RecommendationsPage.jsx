import React from 'react';
import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import RecommendationChat from '../components/RecommendationChat';

const RecommendationsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            height: 'calc(100vh - 110px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
          }}
        >
          <RecommendationChat />
        </Paper>
      </motion.div>
    </Box>
  );
};

export default RecommendationsPage;
