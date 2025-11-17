import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: username,
            password: password
        });

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;

    } catch (error) {
        console.error("LOGIN ERROR:", error.response?.data || error.message);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error("REGISTER ERROR:", error.response?.data || error.message);
        throw error;
    }
};

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
};

export default { login, register, getCurrentUser };
