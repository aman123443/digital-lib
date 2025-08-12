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
import ReviewsPage from './pages/ReviewsPage'; // 1. Import the new page
import Footer from './components/Footer'; // 2. Import the new footer

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
      {/* This Box component ensures the footer stays at the bottom */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div
          className={`background-container ${mode === 'light' ? 'light-gradient' : 'dark-gradient'}`}
        ></div>

        <Navbar toggleTheme={toggleTheme} currentMode={mode} />

        {/* This Box component will grow to fill the available space */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
            <Route path="/book/:id" element={<ProtectedRoute><ReadBookPage /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute><StorePage /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} /> {/* 3. Add the new route */}
          </Routes>
        </Box>

        <Footer /> {/* 4. Add the Footer component */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
