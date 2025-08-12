import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// This is the ONLY line we are changing.
// It uses your Vercel environment variable, but falls back to localhost if it's not found.
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080') + '/api/auth';

const register = (username, email, password) => {
    // This line now correctly points to your live backend or local backend
    return axios.post(API_URL + '/register', { username, email, password });
};

const login = async (username, password) => {
    // This line is also fixed now
    const response = await axios.post(API_URL + '/login', { username, password });
    if (response.data.jwt) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// --- NO OTHER CHANGES NEEDED BELOW THIS LINE ---

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    const decodedJwt = jwtDecode(user.jwt);

    if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        return null;
    }
    return user;
};

const authService = { register, login, logout, getCurrentUser };
export default authService;