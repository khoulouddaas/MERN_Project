import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Skill icons - Assuming these paths are correct relative to your project structure
import csharpImage from './icons/csharp.jpg';
import cssImage from './icons/css.png';
import goImage from './icons/go.jpg';
import htmlImage from './icons/html.jpg';
import javaImage from './icons/java.png';
import jsImage from './icons/js.png';
import pythImage from './icons/pyth.jpg';
import rubyImage from './icons/ruby.jpg';
import sqlImage from './icons/sql.png';
import swiftImage from './icons/swift.png';
import phpImage from './icons/php.png';
import cppImage from './icons/c++.png';

const skillIcons = [
    { skill: 'csharp', icon: csharpImage },
    { skill: 'css', icon: cssImage },
    { skill: 'go', icon: goImage },
    { skill: 'html', icon: htmlImage },
    { skill: 'java', icon: javaImage },
    { skill: 'js', icon: jsImage },
    { skill: 'pyth', icon: pythImage },
    { skill: 'ruby', icon: rubyImage },
    { skill: 'sql', icon: sqlImage },
    { skill: 'swift', icon: swiftImage },
    { skill: 'php', icon: phpImage },
    { skill: 'cpp', icon: cppImage },
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
        // Adding Paper and Card styles for consistency if they were used in the original sketchy theme
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '12px',
                    boxShadow: '6px 6px 0px black',
                    backgroundColor: 'white',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '8px',
                    boxShadow: '4px 4px 0px black',
                    backgroundColor: 'white',
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


const Newposition = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Skills: [],
    });

    // Changed errors to an object to store messages per field
    const [errors, setErrors] = useState({});

    const handleSkillClick = (skill) => {
        const updatedSkills = formData.Skills.includes(skill)
            ? formData.Skills.filter((s) => s !== skill)
            : [...formData.Skills, skill];

        if (updatedSkills.length <= 5) {
            setFormData({ ...formData, Skills: updatedSkills });
            // Clear skills error if a skill is selected
            if (updatedSkills.length > 0) {
                setErrors(prev => ({ ...prev, Skills: undefined }));
            }
        }
    };

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.Name) newErrors.Name = 'Name is required';
        if (!data.Description) newErrors.Description = 'Description is required';
        if (!data.Skills || data.Skills.length === 0) newErrors.Skills = 'Please choose at least one skill';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors); // Set all validation errors

        if (Object.keys(validationErrors).length > 0) {
            return; // Stop submission if there are errors
        }
        try {
            await axios.post('http://localhost:8000/api/positions', formData);
            navigate('/org/dashboard');
        } catch (error) {
            // Handle API errors, potentially setting a general error message
            setErrors(prev => ({ ...prev, general: error.message || 'Failed to create position' }));
        }
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <FormBox>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Add A Position
                    </Typography>

                    {/* Display general error if any */}
                    {errors.general && (
                        <Typography color="error" sx={{ mb: 2, color: 'red' }}>
                            {errors.general}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={formData.Name}
                            onChange={(e) => {
                                setFormData({ ...formData, Name: e.target.value });
                                setErrors(prev => ({ ...prev, Name: undefined })); // Clear error on change
                            }}
                            sx={{ mb: 3 }}
                            error={!!errors.Name}
                            helperText={errors.Name}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            variant="outlined"
                            value={formData.Description}
                            onChange={(e) => {
                                setFormData({ ...formData, Description: e.target.value });
                                setErrors(prev => ({ ...prev, Description: undefined })); // Clear error on change
                            }}
                            sx={{ mb: 3 }}
                            error={!!errors.Description}
                            helperText={errors.Description}
                        />

                        <Typography variant="h6" gutterBottom mb={1}>
                            Skills (Select up to 5)
                        </Typography>

                        <Box
                            sx={{
                                maxHeight: 200,
                                overflowY: 'auto',
                                border: '2px solid black', // Sketchy border
                                borderRadius: '8px', // Slightly rounded
                                p: 1,
                                mb: 1, // Reduced margin bottom to place helperText closer
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                justifyContent: 'center',
                                boxShadow: '3px 3px 0px black', // Sketchy shadow
                            }}
                        >
                            {skillIcons.map(({ skill, icon }) => (
                                <Box
                                    key={skill}
                                    component="img"
                                    src={icon}
                                    alt={skill}
                                    onClick={() => handleSkillClick(skill)}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        cursor: 'pointer',
                                        borderRadius: '8px', // Rounded corners for icons
                                        border: formData.Skills.includes(skill)
                                            ? '3px solid #4CAF50' // Green border when selected
                                            : '2px solid black', // Black border when not selected
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        boxShadow: formData.Skills.includes(skill)
                                            ? '2px 2px 0px #4CAF50' // Green shadow when selected
                                            : '2px 2px 0px black', // Black shadow when not selected
                                        '&:hover': {
                                            borderColor: '#4CAF50', // Green on hover
                                            boxShadow: '1px 1px 0px #4CAF50', // Smaller green shadow on hover
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                        {/* Display skills error below the skills box */}
                        {errors.Skills && (
                            <Typography variant="body2" color="error" textAlign="center" sx={{ color: 'red', mb: 3 }}>
                                {errors.Skills}
                            </Typography>
                        )}


                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/org/dashboard')}
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
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Add Position
                            </Button>
                        </Stack>
                    </Box>
                </FormBox>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default Newposition;
