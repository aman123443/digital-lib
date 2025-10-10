import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto',
        backgroundColor: 'action.hover', // Use theme color for consistency
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' Digital Library. All rights reserved. | '}
        <MuiLink
          component={Link}
          to="/reviews"
          color="inherit"
          sx={{
            fontWeight: 'bold', // Make the link bold
            textDecoration: 'underline',
            '&:hover': {
              color: 'primary.main', // Change color on hover
            },
          }}
        >
          Leave a Review
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
