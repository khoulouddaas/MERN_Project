import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack // Used for layout like form-row
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look - copied from DevRegistration
const sketchTheme = createTheme({
    typography: {
        fontFamily: '"Permanent Marker", cursive', // Use a sketchy font
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black', // Default border
                            borderWidth: '2px',
                            borderRadius: '8px',
                        },
                        '&:hover fieldset': {
                            borderColor: 'black', // Hover border
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'black', // Focused border
                        },
                        backgroundColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: '"Permanent Marker", cursive',
                        color: 'black',
                    },
                    '& .MuiInputBase-input': {
                        fontFamily: '"Permanent Marker", cursive',
                        color: 'black',
                    },
                },
            },
        },
        MuiSelect: { // Included for consistency, though not used in login
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                        borderWidth: '2px',
                        borderRadius: '8px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                    backgroundColor: 'white',
                    fontFamily: '"Permanent Marker", cursive',
                    color: 'black',
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
    },
});

// Styled Box for the container to apply background and simplified dashed lines
const SketchContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh', // Keep minHeight to ensure it covers the viewport if content is short
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
    paddingTop: theme.spacing(8), // Add some top padding to push it down slightly, adjust as needed
    paddingBottom: theme.spacing(4), // Add some bottom padding
    backgroundColor: '#f0f0f0', // Light grey background
    position: 'relative',
    overflow: 'hidden', // Hide overflow for dashed lines
    // Removed the '::before' and '::after' pseudo-elements for the dashed lines
}));

// Styled Box for the registration/login box - copied from DevRegistration
const LoginBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '12px', // Slightly rounded corners for the box
    border: '2px solid black', // Black border for the box
    boxShadow: '6px 6px 0px black', // Sketchy shadow for the main box
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative', // Ensure content is above pseudo-elements
    zIndex: 1,
}));

export const DevLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false); // This state is not directly used in the UI, but kept for consistency
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/devs/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log("Logging in...");
                setErrorMessage("");
                setLoggedIn(true);
                nav("/devs/profile");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <LoginBox>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome Developers!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        See why so many out of bootcamp developers choose us to help them find
                        a new career opportunity! Let's connect you to a job!
                    </Typography>

                    {errorMessage && (
                        <Typography color="error" sx={{ mb: 2, fontWeight: 'bold', color: 'red' }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={login} sx={{ mt: 2 }}>
                        <TextField
                            label="Email Address"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoFocus
                        />

                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <Link to="/devs/register" style={{ textDecoration: 'none', color: 'black', fontFamily: '"Permanent Marker", cursive' }}>
                            Don't have an account? Register Here!
                        </Link>
                    </Typography>
                </LoginBox>
            </SketchContainer>
        </ThemeProvider>
    );
};
