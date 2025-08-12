import { createTheme } from '@mui/material/styles';

const commonSettings = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 'bold',
                }
            }
        }
    }
};

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // A classic blue
        },
        secondary: {
            main: '#f50057', // A vibrant pink for contrast
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
    },
    ...commonSettings
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // A lighter blue for dark mode
        },
        secondary: {
            main: '#f48fb1', // A softer pink
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b0b0b0',
        }
    },
    ...commonSettings
});
