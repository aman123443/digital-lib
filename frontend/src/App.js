import React, { useState, useMemo } from 'react';
// REMOVED: import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // Keep these
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { AuthProvider } from './context/AuthContext';
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
import MyLibraryPage from './pages/MyLibraryPage';
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
      {/* The <Router> component is removed from here */}
      <AuthProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div
            className={`background-container ${mode === 'light' ? 'light-gradient' : 'dark-gradient'}`}
          ></div>

          <Navbar toggleTheme={toggleTheme} currentMode={mode} />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
              <Route path="/read/:id" element={<ProtectedRoute><ReadBookPage /></ProtectedRoute>} />
              <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
              <Route path="/store" element={<ProtectedRoute><StorePage /></ProtectedRoute>} />
              <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
              <Route path="/my-library" element={<ProtectedRoute><MyLibraryPage /></ProtectedRoute>} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </AuthProvider>
      {/* The </Router> tag is also removed from here */}
    </ThemeProvider>
  );
}

export default App;