import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LibraryPage from './pages/LibraryPage';
import ReadBookPage from './pages/ReadBookPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RecommendationsPage from './pages/RecommendationsPage';
import StorePage from './pages/StorePage';
import ReviewsPage from './pages/ReviewsPage';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div
          className={`background-container ${mode === 'light' ? 'light-gradient' : 'dark-gradient'}`}
        ></div>

        <Navbar toggleTheme={toggleTheme} currentMode={mode} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}> {/* Added some padding for content */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />

            {/* --- CHANGE 1: Corrected the path for consistency --- */}
            {/* The "Read" button in your Library page links to /read/:id, so this route must match. */}
            <Route path="/read/:id" element={<ProtectedRoute><ReadBookPage /></ProtectedRoute>} />

            <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />

            {/* --- CHANGE 2: Added the missing route for the store/search page --- */}
            {/* I am assuming your <StorePage /> component renders the <BookSearch /> component. */}
            <Route path="/search" element={<ProtectedRoute><StorePage /></ProtectedRoute>} />

            <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />

            {/* The old /book/:id route has been removed to avoid confusion. */}
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;