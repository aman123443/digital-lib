import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Menu, MenuItem, Button, Stack } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleTheme, currentMode }) => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        authService.logout();
        handleClose();
        navigate('/login');
        // A simple navigation is often better than a full page reload
        // window.location.reload();
    };

    return (
        <AppBar position="sticky" color="transparent" elevation={1} sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
            <Toolbar>
                <IconButton component={Link} to={currentUser ? "/library" : "/"} color="inherit" edge="start">
                    <MenuBookIcon sx={{ mr: 1 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Digital Library
                </Typography>

                {/* --- THIS NAVIGATION SECTION HAS BEEN UPDATED --- */}
                {/* These links will now only appear if a user is logged in */}
                {currentUser && (
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" component={Link} to="/library">
                                My Library
                            </Button>
                            <Button color="inherit" component={Link} to="/search">
                                Book Store
                            </Button>
                            <Button color="inherit" component={Link} to="/recommendations">
                                AI Recommendations
                            </Button>
                        </Stack>
                    </Box>
                )}

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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            // Styling for the dropdown menu
                            sx={{
                                '& .MuiMenu-paper': {
                                    backdropFilter: 'blur(10px)',
                                    backgroundColor: 'rgba(70, 70, 70, 0.2)', // Example dark-blurry menu
                                    borderRadius: 2,
                                },
                            }}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
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