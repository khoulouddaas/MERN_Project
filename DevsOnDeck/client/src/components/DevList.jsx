import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Grid,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    Dialog,        // Added for custom confirm dialog
    DialogActions, // Added for custom confirm dialog
    DialogContent, // Added for custom confirm dialog
    DialogContentText, // Added for custom confirm dialog
    DialogTitle,   // Added for custom confirm dialog
    Stack
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

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
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '8px',
                    boxShadow: '4px 4px 0px black', // Smaller shadow for cards
                    backgroundColor: 'white',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '2px solid black',
                    borderRadius: '12px',
                    boxShadow: '6px 6px 0px black', // Sketchy shadow for paper containers
                    backgroundColor: 'white',
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

export const DevList = () => {
    const [devList, setDevList] = useState([]);
    const [company, setCompany] = useState({}); // This state is fetched but not used in the current UI
    const [positions, setPositions] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [devToDelete, setDevToDelete] = useState(null);

    const nav = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/devswithskills')
            .then((res) => setDevList(res.data))
            .catch((err) => console.error('Error fetching devs with skills:', err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/org/allOrganizations', { withCredentials: true })
            .then((res) => setCompany(res.data))
            .catch((err) => console.error('Error fetching company:', err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/positions')
            .then((res) => setPositions(res.data))
            .catch((err) => console.error('Error fetching positions:', err));
    }, []);

    const handleOpenConfirm = (devId) => {
        setDevToDelete(devId);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setDevToDelete(null);
    };

    const handleDeleteDev = async () => {
        if (devToDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/devs/${devToDelete}`);
                setDevList(devList.filter((dev) => dev._id !== devToDelete));
                handleCloseConfirm();
            } catch (error) {
                console.error('Failed to delete developer:', error);
                handleCloseConfirm();
            }
        }
    };

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Left: Positions Column */}
                        <Grid item xs={12} md={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: '#3399ff', // Blue color for this button
                                    marginBottom: 2,
                                    fontFamily: '"Permanent Marker", cursive',
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    boxShadow: '3px 3px 0px black',
                                    '&:hover': {
                                        backgroundColor: '#2a7fd4',
                                        boxShadow: '1px 1px 0px black',
                                    },
                                }}
                                component={Link}
                                to="/jobs/create"
                            >
                                List a New Position
                            </Button>

                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    Positions To Fill
                                </Typography>
                                <List>
                                    {positions.length === 0 ? (
                                        <ListItem>
                                            <ListItemText primary="No positions listed." />
                                        </ListItem>
                                    ) : (
                                        positions.map((pos) => (
                                            <ListItem
                                                key={pos._id}
                                                component={Link}
                                                to={`/positions/${pos._id}`}
                                                button
                                                sx={{
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '4px',
                                                    marginBottom: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#f5f5f5',
                                                    },
                                                }}
                                            >
                                                <ListItemText primary={pos.Name} sx={{ fontFamily: '"Permanent Marker", cursive' }} />
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff89a',
                                        padding: 1,
                                        marginTop: 2,
                                        borderLeft: '5px solid red',
                                        fontSize: '0.875rem',
                                        fontFamily: '"Permanent Marker", cursive',
                                    }}
                                >
                                    The positions to fill for the organization
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right: Developers Column */}
                        <Grid item xs={12} md={8}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#ccc',
                                        padding: 1,
                                        marginBottom: 2,
                                        fontFamily: '"Permanent Marker", cursive',
                                        border: '2px solid black',
                                        borderRadius: '8px',
                                        boxShadow: '3px 3px 0px black',
                                    }}
                                >
                                    Available Devs
                                </Typography>
                                <Box sx={{ maxHeight: 500, overflowY: 'auto', padding: 1 }}>
                                    {devList.length === 0 ? (
                                        <Typography sx={{ fontFamily: '"Permanent Marker", cursive' }}>No developers found.</Typography>
                                    ) : (
                                        devList.map((dev) => (
                                            <Card key={dev._id} sx={{ marginBottom: 2 }}>
                                                <CardContent>
                                                    <Grid container alignItems="center">
                                                        {/* Left: Developer Info */}
                                                        <Grid item xs={10}>
                                                            <Typography variant="h6" sx={{ color: '#ff8c00', fontFamily: '"Permanent Marker", cursive' }}>
                                                                <Link
                                                                    to={`/devs/${dev._id}`}
                                                                    style={{ color: '#ff8c00', textDecoration: 'none', fontFamily: '"Permanent Marker", cursive' }}
                                                                >
                                                                    {dev.firstName} {dev.lastName}
                                                                </Link>
                                                            </Typography>

                                                            <Typography variant="body1" sx={{ fontWeight: 'bold', marginY: 1, fontFamily: '"Permanent Marker", cursive' }}>
                                                                {Array.isArray(dev.languages) && dev.languages.length > 0
                                                                    ? dev.languages.join(' • ')
                                                                    : 'No languages'}
                                                            </Typography>

                                                            <Typography variant="body2" sx={{ fontFamily: '"Permanent Marker", cursive' }}>
                                                                {dev.bio || 'No bio available'}
                                                            </Typography>
                                                        </Grid>
                                                       
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </SketchContainer>

         
        </ThemeProvider>
    );
};

export default DevList;
