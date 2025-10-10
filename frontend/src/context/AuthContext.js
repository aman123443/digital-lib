import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // Your existing authService

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 3. Check for a logged-in user when the app first loads
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    // 4. Provide the user state and a function to update it to the rest of the app
    const authValue = { user, setUser };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};