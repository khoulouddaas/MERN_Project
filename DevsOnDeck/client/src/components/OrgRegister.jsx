import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Stack
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look
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
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to top
    paddingTop: theme.spacing(8), // Add some top padding
    paddingBottom: theme.spacing(4), // Add some bottom padding
    backgroundColor: '#f0f0f0', // Light grey background
    position: 'relative',
    overflow: 'hidden', // Hide overflow for dashed lines
    // Removed the '::before' and '::after' pseudo-elements for the dashed lines
}));

// Styled Box for the registration box
const RegistrationBox = styled(Box)(({ theme }) => ({
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

const OrgRegistration = () => {
    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState({});
    const [org, setOrg] = useState({
        name: "",
        firstName: "", // Added as per image
        lastName: "",  // Added as per image
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    const handleChange = (e) => {
        setOrg({
            ...org,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        // The API endpoint might need to be updated on your backend to accept firstName and lastName
        axios.post("http://localhost:8000/api/org/register", org, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setOrg({
                    name: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thanks for registering with us! Log in now!");
                setErrors({});
                nav('/org/login');
            })
            .catch((err) => {
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ general: "Something went wrong. Please try again later." });
                    console.error("Unexpected error:", err);
                }
            });
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <RegistrationBox>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Organization Sign Up
                    </Typography>

                    {confirmReg && <Typography color="success.main" sx={{ mb: 2 }}>{confirmReg}</Typography>}
                    {errors.general && <Typography color="error" sx={{ mb: 2, color: 'red' }}>{errors.general}</Typography>}

                    <Box component="form" onSubmit={register} sx={{ mt: 2 }}>
                        <TextField
                            label="Org Name"
                            name="name"
                            value={org.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                       

                        <TextField
                            label="Contact Email"
                            type="email"
                            name="email"
                            value={org.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Org Address"
                            name="address"
                            value={org.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="Org City"
                                name="city"
                                value={org.city}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                            <FormControl fullWidth error={!!errors.state}>
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    label="State"
                                    name="state"
                                    value={org.state}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">-- Select State --</MenuItem>
                                    <MenuItem value="AL">AL</MenuItem>
                                    <MenuItem value="CA">CA</MenuItem>
                                    <MenuItem value="NY">NY</MenuItem>
                                    <MenuItem value="TX">TX</MenuItem>
                                </Select>
                                {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
                            </FormControl>
                        </Stack>

                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={org.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={org.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <Link to="/devs/register" style={{ textDecoration: 'none', color: 'black', fontFamily: '"Permanent Marker", cursive' }}>
                            Need to Sign Up as a developer?
                        </Link>
                    </Typography>
                </RegistrationBox>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default OrgRegistration;
