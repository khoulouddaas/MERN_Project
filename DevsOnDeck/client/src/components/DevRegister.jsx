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
import { GoogleLogin } from '@react-oauth/google'; // ✅ Import GoogleLogin

// Custom theme
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

const RegistrationBox = styled(Box)(({ theme }) => ({
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

const DevRegistration = () => {
    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState({});
    const [dev, setDev] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    const handleChange = (e) => {
        setDev({
            ...dev,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/devs/register", dev, { withCredentials: true })
            .then((res) => {
                const devId = res.data.dev._id;

                setDev({
                    firstName: "",
                    lastName: "",
                    address: "",
                    city: "",
                    state: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thanks for registering with us! Log in now!");
                setErrors({});

                if (devId) {
                    nav(`/devs/skills/languages/${devId}`);
                } else {
                    console.error("Developer ID not found in response");
                }
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

   const handleGoogleSuccess = (credentialResponse) => {
  console.log("✅ Google credential:", credentialResponse);

  // Decode token or send it to backend to verify and get devId
  axios.post('http://localhost:8000/api/devs/google-login', {
    token: credentialResponse.credential
  })
  .then(res => {
    const devId = res.data.dev._id; // adjust according to your backend response
    if (devId) {
      nav(`/devs/skills/languages/${devId}`);
    } else {
      console.error("Developer ID not found in response");
    }
  })
  .catch(err => {
    console.error("Google Login Failed:", err);
  });
};

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <RegistrationBox>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Developer Sign Up
                    </Typography>

                    {confirmReg && <Typography color="success.main" sx={{ mb: 2 }}>{confirmReg}</Typography>}
                    {errors.general && <Typography color="error" sx={{ mb: 2 }}>{errors.general}</Typography>}

                    <Box component="form" onSubmit={register} sx={{ mt: 2 }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={dev.firstName}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={dev.lastName}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Stack>

                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={dev.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Address"
                            name="address"
                            value={dev.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="City"
                                name="city"
                                value={dev.city}
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
                                    value={dev.state}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">-- Select State --</MenuItem>
                                    <MenuItem value="AL">AL</MenuItem>
                                    <MenuItem value="AK">AK</MenuItem>
                                    <MenuItem value="AZ">AZ</MenuItem>
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
                            value={dev.password}
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
                            value={dev.confirmPassword}
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

                    {/* ✅ Google Login Button */}
                    <Box mt={2}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </Box>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <Link to="/org/register" style={{ textDecoration: 'none', color: 'black', fontFamily: '"Permanent Marker", cursive' }}>
                            Need to Sign Up an Organization?
                        </Link>
                    </Typography>
                </RegistrationBox>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default DevRegistration;
