import axios from 'axios';
import authService from './authService';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

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