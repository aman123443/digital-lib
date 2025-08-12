import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Home = () => {
  const features = [
    { title: 'Expansive Digital Library', description: 'Access a vast collection of public domain classics. Read online with our professional e-book reader.', icon: <MenuBookIcon color="primary" /> },
    { title: 'AI-Powered Recommendations', description: 'Describe any book you can imagine, and our AI assistant will give you a personalized recommendation.', icon: <AutoAwesomeIcon color="primary" /> },
    { title: 'Integrated Book Store', description: 'Find any book, modern or classic, and get direct links to purchase from major online retailers.', icon: <StorefrontIcon color="primary" /> },
  ];

  return (
    <Box sx={{ flexGrow: 1, color: 'text.primary', overflowX: 'hidden' }}>
      {/* --- Hero Section --- */}
      <Box sx={{ textAlign: 'center', p: { xs: 4, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Your Digital Library
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Discover, read, and get intelligent recommendations for your next favorite book.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 8 }}>
            <Button component={Link} to="/library" variant="contained" size="large" startIcon={<MenuBookIcon />}>
              Explore Library
            </Button>
            <Button component={Link} to="/recommendations" variant="outlined" size="large" startIcon={<AutoAwesomeIcon />}>
              Get Recommendations
            </Button>
            <Button component={Link} to="/store" variant="outlined" size="large" startIcon={<StorefrontIcon />}>
              Visit Store
            </Button>
          </Stack>
        </motion.div>
      </Box>

      {/* --- Features Section --- */}
      <Box id="features" sx={{ p: { xs: 4, md: 8 }, backgroundColor: 'action.hover' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center', backgroundColor: 'transparent' }}>
                  <Box sx={{ fontSize: 48, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>{feature.title}</Typography>
                  <Typography color="text.secondary">{feature.description}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- How It Works Section --- */}
      <Box id="how-it-works" sx={{ p: { xs: 4, md: 8 } }}>
         <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={6}>
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>1. Explore & Read</Typography>
                    <Typography color="text.secondary">Browse our public library of classic e-books. When you find one you like, open it in our professional, distraction-free online reader.</Typography>
                </motion.div>
            </Grid>
             <Grid xs={12} md={6}>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>2. Get AI Recommendations</Typography>
                    <Typography color="text.secondary">Feeling adventurous? Tell our AI chatbot what you're in the mood for, and it will suggest the perfect book from anywhere in the world.</Typography>
                </motion.div>
            </Grid>
             <Grid xs={12} md={6}>
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>3. Find & Purchase</Typography>
                    <Typography color="text.secondary">Looking for a modern bestseller? Use our store to search for any book and get direct links to purchase it from major online retailers.</Typography>
                </motion.div>
            </Grid>
        </Grid>
      </Box>

      {/* --- Use Cases Section --- */}
      <Box id="use-cases" sx={{ p: { xs: 4, md: 8 }, backgroundColor: 'action.hover' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
          Who Is This For?
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
            <Grid xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <SchoolIcon sx={{fontSize: 48, mb: 2}} />
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>Students & Researchers</Typography>
                    <Typography color="text.secondary">Access classic literature and scholarly works for your studies, all for free.</Typography>
                </Paper>
            </Grid>
            <Grid xs={12} md={4}>
                 <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <FavoriteIcon sx={{fontSize: 48, mb: 2}} />
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>Book Lovers</Typography>
                    <Typography color="text.secondary">Discover new authors and genres with the help of our intelligent AI recommendation engine.</Typography>
                </Paper>
            </Grid>
            <Grid xs={12} md={4}>
                 <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <SearchIcon sx={{fontSize: 48, mb: 2}} />
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>Casual Readers</Typography>
                    <Typography color="text.secondary">Easily find and purchase any book you're looking for, all from one convenient platform.</Typography>
                </Paper>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
