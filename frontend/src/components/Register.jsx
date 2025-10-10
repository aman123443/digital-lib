import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Box, Alert } from '@mui/material';
import authService from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.register(username, email, password);
            navigate('/login');
        } catch (err) {
            setError('Failed to register. Username or email may already be in use.');
            console.error('Failed to register', err);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
            <Card sx={{ minWidth: 350, boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                        Create Account
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required />
                        <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
                        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>
                            Register
                        </Button>
                    </form>
                    <Typography textAlign="center" sx={{ mt: 2 }}>
                        Already have an account? <Link to="/login">Login here</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
