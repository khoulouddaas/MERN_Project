import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';  // Adjust path as needed
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look
const sketchTheme = createTheme({
    typography: {
        fontFamily: '"Permanent Marker", cursive',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                            borderWidth: '2px',
                            borderRadius: '8px',
                        },
                        '&:hover fieldset': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'black',
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
        MuiSelect: {
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
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: '2px solid black',
                    borderRadius: '8px',
                    boxShadow: '3px 3px 0px black',
                    '&:hover': {
                        backgroundColor: '#45a049',
                        boxShadow: '1px 1px 0px black',
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

// Styled container box
const SketchContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    backgroundColor: '#f0f0f0',
    position: 'relative',
    overflow: 'hidden',
}));

// Styled login box
const LoginBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '12px',
    border: '2px solid black',
    boxShadow: '6px 6px 0px black',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
}));

export const OrgLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/org/login",
                { email, password },
                { withCredentials: true }
            )
            .then((res) => {
                console.log("Organization logging in...", res);
                setErrorMessage("");
                login('org');
                nav("/org/dashboard");
            })
            .catch((err) => {
                console.log(err.response?.data || err);
                setErrorMessage(err.response?.data?.message || "Login failed");
            });
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <LoginBox>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome Organizations!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Let’s connect you with talented developers. Sign in to manage your jobs and find your next hire!
                    </Typography>

                    {errorMessage && (
                        <Typography color="red" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoFocus
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            
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
                        <Link
                            to="/org/register"
                            style={{ textDecoration: 'none', color: 'black', fontFamily: '"Permanent Marker", cursive' }}
                        >
                            Don't have an account? Register Here!
                        </Link>
                    </Typography>
                </LoginBox>
            </SketchContainer>
        </ThemeProvider>
    );
};
