import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look (copied from previous components)
const sketchTheme = createTheme({
    typography: {
        fontFamily: '"Permanent Marker", cursive', // Use a sketchy font
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f0f0f0', // Light grey background for app bar
                    borderBottom: '2px solid black', // Sketchy border at the bottom
                    boxShadow: '0px 4px 0px -2px black', // Sketchy shadow
                    position: 'relative', // Ensure it sits correctly
                    zIndex: 10, // Ensure it's above other content
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between', // Space out title and links
                    paddingLeft: '16px', // Default padding
                    paddingRight: '16px', // Default padding
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: '"Permanent Marker", cursive',
                    backgroundColor: '#4CAF50', // Green from the image
                    color: 'white',
                    border: '2px solid black',
                    borderRadius: '8px',
                    boxShadow: '3px 3px 0px black', // Sketchy shadow for button
                    '&:hover': {
                        backgroundColor: '#45a049', // Darker green on hover
                        boxShadow: '1px 1px 0px black', // Smaller shadow on hover
                    },
                    textTransform: 'none', // Keep button text as is
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: '"Permanent Marker", cursive',
                    color: 'black',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: '"Permanent Marker", cursive',
                    color: 'black',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
            },
        },
    },
});

export const NavBar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if (auth === 'dev') {
                await axios.post('http://localhost:8000/api/devs/logout', {}, { withCredentials: true });
            } else if (auth === 'org') {
                await axios.post('http://localhost:8000/api/org/logout', {}, { withCredentials: true });
            }
            logout();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                            DevsOnDeck
                        </Link>
                    </Typography>

                    <Box>
                        {!auth && (
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h6">
                                    <Link to="/devs/login" style={{ textDecoration: 'none', color: 'black' }}>
                                        Dev Login
                                    </Link>
                                </Typography>
                                <Typography variant="h6">
                                    <Link to="/org/login" style={{ textDecoration: 'none', color: 'black' }}>
                                        Org Login
                                    </Link>
                                </Typography>
                            </Stack>
                        )}
                        {auth === 'dev' && (
                            <Typography variant="h6">
                                <Link to="#" onClick={handleLogout} style={{ textDecoration: 'none', color: 'black' }}>
                                    Dev Logout
                                </Link>
                            </Typography>
                        )}
                        {auth === 'org' && (
                            <Typography variant="h6">
                                <Link to="#" onClick={handleLogout} style={{ textDecoration: 'none', color: 'black' }}>
                                    Org Logout
                                </Link>
                            </Typography>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default NavBar;
