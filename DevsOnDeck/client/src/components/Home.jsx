import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Container,
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

// Styled Box for the container to apply background and reduced top space
const SketchContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center content vertically
    padding: theme.spacing(1), // Further reduced padding from theme.spacing(4) to theme.spacing(2)
    backgroundColor: '#f0f0f0', // Light grey background
    position: 'relative',
    overflow: 'hidden', // Hide overflow
}));

const ContentBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(6), // Increased padding for a more substantial box
    borderRadius: '12px',
    border: '2px solid black',
    boxShadow: '6px 6px 0px black', // Sketchy shadow for the main box
    maxWidth: '600px', // Set a max width for the content box
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
}));

export const Home = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <ContentBox>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
                        Welcome to DevsOn Deck!
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ mb: 4 }}>
                        Developers: Land your next dream job. <br />
                        Companies: Discover top talent ready to work.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate('/devs/register')}
                            sx={{
                               
                            }}
                        >
                            Join as Developer
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/org/register')}
                            sx={{
                               
                            }}
                        >
                            Register as Company
                        </Button>
                    </Stack>
                </ContentBox>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default Home;
