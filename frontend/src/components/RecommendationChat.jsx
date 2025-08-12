import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, CircularProgress, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api'; // Our authenticated API service
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const RecommendationChat = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'How can I help you find your next book today? Describe what you are looking for.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: prompt };
        setMessages(prev => [...prev, userMessage]);
        const currentPrompt = prompt;
        setPrompt('');
        setIsLoading(true);

        try {
            const response = await api.post('/recommendations', { prompt: currentPrompt });

            // The backend now returns a simple string, so no parsing is needed
            const aiText = response.data;

            const aiMessage = { sender: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error fetching recommendation:", error);
            const errorMessage = { sender: 'ai', text: 'Sorry, I had trouble finding a recommendation. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
                AI Recommendations
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    mb: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 2
                }}
            >
                <List>
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                layout
                            >
                                <ListItem sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, maxWidth: '80%' }}>
                                        {msg.sender === 'ai' && <Avatar sx={{ bgcolor: 'primary.main' }}><SmartToyIcon /></Avatar>}
                                        <Paper
                                            sx={{
                                                p: 1.5,
                                                bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                                                color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                                                borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                                        </Paper>
                                        {msg.sender === 'user' && <Avatar><PersonIcon /></Avatar>}
                                    </Box>
                                </ListItem>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                         <ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                             <CircularProgress size={24} sx={{mr: 2}} />
                             <Typography>Thinking...</Typography>
                         </ListItem>
                    )}
                </List>
            </Paper>
            <form onSubmit={handleSendMessage}>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="e.g., a classic mystery novel..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="contained" sx={{ ml: 1 }} disabled={isLoading}>
                        Send
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default RecommendationChat;
