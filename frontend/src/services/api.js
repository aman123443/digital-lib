import axios from 'axios';
import authService from './authService';

// --- THIS IS THE FIX ---
// 1. Define the base API URL using the environment variable.
//    This works for both production (Vercel) and local development.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
    // 2. Use the API_URL variable to set the base URL for all requests.
    //    We also add '/api' here to match your backend's structure.
    baseURL: `${API_URL}/api`,
});

// This interceptor is written perfectly. It automatically adds the JWT token
// to every request for protected endpoints. No changes are needed here.
api.interceptors.request.use(config => {
    const user = authService.getCurrentUser();

    if (user && user.jwt) {
        config.headers.Authorization = 'Bearer ' + user.jwt;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;