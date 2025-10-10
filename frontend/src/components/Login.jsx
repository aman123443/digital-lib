import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Box, Alert } from '@mui/material';
import authService from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.login(username, password);
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Failed to login', err);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
            <Card sx={{ minWidth: 350, boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>
                            Login
                        </Button>
                    </form>
                    <Typography textAlign="center" sx={{ mt: 2 }}>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
