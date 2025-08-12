import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If a user is logged in, show the page content
    return children;
};

export default ProtectedRoute;
