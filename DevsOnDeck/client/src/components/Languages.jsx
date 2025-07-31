import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Avatar,
    Container,
    Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Import icons - Assuming these paths are correct relative to your project structure
import cssIcon from './icons/css.png';
import csharpIcon from './icons/csharp.jpg';
import goIcon from './icons/go.jpg';
import htmlIcon from './icons/html.jpg';
import javaIcon from './icons/java.png';
import jsIcon from './icons/js.png';
import pythonIcon from './icons/pyth.jpg';
import rubyIcon from './icons/ruby.jpg';
import sqlIcon from './icons/sql.png';
import swiftIcon from './icons/swift.png';
import phpIcon from './icons/php.png';
import cppIcon from './icons/c++.png';

const languageOptions = [
    { name: 'csharp', icon: csharpIcon },
    { name: 'css', icon: cssIcon },
    { name: 'go', icon: goIcon },
    { name: 'html', icon: htmlIcon },
    { name: 'java', icon: javaIcon },
    { name: 'js', icon: jsIcon },
    { name: 'python', icon: pythonIcon },
    { name: 'ruby', icon: rubyIcon },
    { name: 'sql', icon: sqlIcon },
    { name: 'swift', icon: swiftIcon },
    { name: 'php', icon: phpIcon },
    { name: 'c++', icon: cppIcon },
];

// Custom theme for the sketchy look (copied from previous components)
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
        MuiPaper: { // For consistency
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '12px',
                    boxShadow: '6px 6px 0px black',
                    backgroundColor: 'white',
                },
            },
        },
        MuiCard: { // For consistency
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '8px',
                    boxShadow: '4px 4px 0px black',
                    backgroundColor: 'white',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    border: '2px solid black', // Default border for avatars
                    borderRadius: '8px', // Square-ish rounded corners
                    boxShadow: '2px 2px 0px black', // Small shadow for avatars
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
    alignItems: 'flex-start', // Align to top
    paddingTop: theme.spacing(8), // Add some top padding to push it down slightly
    paddingBottom: theme.spacing(4), // Add some bottom padding
    backgroundColor: '#f0f0f0', // Light grey background
    position: 'relative',
    overflow: 'hidden', // Hide overflow for any potential overflow
    // Removed the '::before' and '::after' pseudo-elements for the dashed lines
}));

// Styled Box for the form content box
const FormBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '12px',
    border: '2px solid black',
    boxShadow: '6px 6px 0px black', // Sketchy shadow for the main box
    maxWidth: '600px', // Adjusted max width for the form itself
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
}));

const Languages = () => {
    const [languages, setLanguages] = useState([]);
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { devId } = useParams();

    const handleAddLang = (lang) => {
        if (languages.length < 5 && !languages.includes(lang)) {
            setLanguages([...languages, lang]);
        } else if (languages.includes(lang)) {
            // Allow deselecting a language
            setLanguages(languages.filter(l => l !== lang));
        }
    };

    const handleSubmit = () => {
        axios.post(`http://localhost:8000/api/skills/languages/${devId}`, {
            languages,
            bio,
        })
            .then(() => navigate('/'))
            .catch(err => {
                const errs = err.response?.data?.errors;
                const messages = errs ? Object.values(errs).map(e => e.message) : ['Unexpected error'];
                setErrors(messages);
            });
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <FormBox>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Add Your Skills
                    </Typography>

                    <Typography variant="h6" mb={1}>
                        Pick Your Top 5 Languages
                    </Typography>

                    {/* Selected language row */}
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{
                            border: '2px solid black', // Sketchy border
                            p: 1,
                            borderRadius: '8px', // Slightly rounded
                            minHeight: 60,
                            mb: 3,
                            overflowX: 'auto', // Allow horizontal scrolling if many selected
                            boxShadow: '3px 3px 0px black', // Sketchy shadow
                        }}
                    >
                        {languages.length === 0 ? (
                            <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic', fontFamily: '"Permanent Marker", cursive' }}>
                                No languages selected. Click icons below to add.
                            </Typography>
                        ) : (
                            languages.map((lang, idx) => {
                                const img = languageOptions.find(l => l.name === lang)?.icon;
                                return (
                                    <Avatar
                                        key={idx}
                                        src={img}
                                        alt={lang}
                                        sx={{
                                            width: 48, // Slightly larger for selected
                                            height: 48,
                                            border: '3px solid #4CAF50', // Green border for selected
                                            boxShadow: '2px 2px 0px #4CAF50', // Green shadow
                                            cursor: 'pointer', // Indicate it's clickable to remove
                                        }}
                                        onClick={() => handleAddLang(lang)} // Click to remove
                                    />
                                );
                            })
                        )}
                    </Box>

                    <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                        {languageOptions.map((langObj) => (
                            <Grid item xs={3} sm={2} key={langObj.name}>
                                <Stack alignItems="center">
                                    <Avatar
                                        src={langObj.icon}
                                        alt={langObj.name}
                                        onClick={() => handleAddLang(langObj.name)}
                                        sx={{
                                            width: 56, // Larger icons for selection grid
                                            height: 56,
                                            cursor: 'pointer',
                                            border: languages.includes(langObj.name)
                                                ? '3px solid #4CAF50' // Green border when selected
                                                : '2px solid black', // Black border when not selected
                                            boxShadow: languages.includes(langObj.name)
                                                ? '3px 3px 0px #4CAF50' // Green shadow when selected
                                                : '3px 3px 0px black', // Black shadow when not selected
                                            transition: 'border-color 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                borderColor: '#4CAF50',
                                                boxShadow: '1px 1px 0px #4CAF50',
                                            },
                                        }}
                                    />
                                    <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                        {langObj.name.toUpperCase()}
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Bio box */}
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Short Bio
                        </Typography>
                        <TextField
                            multiline
                            rows={6}
                            fullWidth
                            label="Add more about yourself here..." // Changed placeholder to label for consistency
                            variant="outlined" // Explicitly set variant
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </Box>

                    {/* Buttons */}
                    <Stack direction="row" justifyContent="space-between" mt={4} spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/devs/login')} // Assuming this is the correct skip destination
                            sx={{
                                borderColor: 'black', // Outlined button border
                                color: 'black', // Outlined button text color
                                boxShadow: '3px 3px 0px black', // Sketchy shadow
                                '&:hover': {
                                    borderColor: 'black',
                                    boxShadow: '1px 1px 0px black',
                                },
                            }}
                        >
                            Skip This Step
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Finished
                        </Button>
                    </Stack>

                    {/* Error messages */}
                    {errors.length > 0 && (
                        <Box mt={2}>
                            {errors.map((err, idx) => (
                                <Typography key={idx} variant="body2" color="error" textAlign="center" sx={{ color: 'red' }}>
                                    {err}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </FormBox>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default Languages;
