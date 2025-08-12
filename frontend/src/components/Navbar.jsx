import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Menu, MenuItem, Button, Stack } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleTheme, currentMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = authService.getCurrentUser();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        authService.logout();
        handleClose();
        navigate('/login');
        window.location.reload();
    };

    // Function to handle smooth scrolling on the home page
    const handleScroll = (id) => {
        // If we are not on the home page, navigate there first
        if (location.pathname !== '/') {
            navigate('/');
            // Use a timeout to allow the page to navigate before trying to scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // If we are already on the home page, just scroll
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <AppBar position="sticky" color="transparent" elevation={1} sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
            <Toolbar>
                <IconButton component={Link} to="/" color="inherit" edge="start">
                    <MenuBookIcon sx={{ mr: 1 }} />
                </IconButton>
                <Typography variant="h6" component="div">
                    Digital Library
                </Typography>

                {/* --- New Navigation Links --- */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" onClick={() => handleScroll('features')}>Features</Button>
                        <Button color="inherit" onClick={() => handleScroll('how-it-works')}>How It Works</Button>
                        <Button color="inherit" onClick={() => handleScroll('use-cases')}>Use Cases</Button>
                    </Stack>
                </Box>

                <Tooltip title={currentMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}>
                    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                        {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>

                {currentUser ? (
                    <div>
                        <IconButton size="large" onClick={handleMenu} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Box
                            component="div"
                            sx={{
                                '& .MuiMenu-paper': {
                                    backdropFilter: 'blur(10px)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 2,
                                },
                            }}
                        >
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </div>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
