import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    Button, // Ensure Button is imported for the delete button
    Dialog,        // Added for custom confirm dialog
    DialogActions, // Added for custom confirm dialog
    DialogContent, // Added for custom confirm dialog
    DialogContentText, // Added for custom confirm dialog
    DialogTitle,   // Added for custom confirm dialog
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
        MuiAvatar: { // For consistency
            styleOverrides: {
                root: {
                    border: '2px solid black', // Default border for avatars
                    borderRadius: '8px', // Square-ish rounded corners
                    boxShadow: '2px 2px 0px black', // Small shadow for avatars
                },
            },
        },
        MuiDialog: { // Style for the dialog box
            styleOverrides: {
                paper: {
                    border: '2px solid black',
                    borderRadius: '12px',
                    boxShadow: '6px 6px 0px black',
                    backgroundColor: 'white',
                    fontFamily: '"Permanent Marker", cursive',
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: '"Permanent Marker", cursive',
                    color: 'black',
                }
            }
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    fontFamily: '"Permanent Marker", cursive',
                    color: 'black',
                }
            }
        }
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
}));

// Styled Box for the content box
const ContentBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '12px',
    border: '2px solid black',
    boxShadow: '6px 6px 0px black', // Sketchy shadow for the main box
    maxWidth: '800px', // Adjusted max width for better layout of details
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
}));

const PositionDetails = () => {
    const { positionId } = useParams();
    const [position, setPosition] = useState(null);
    const [devs, setDevs] = useState([]);
    const [loadingPosition, setLoadingPosition] = useState(true);
    const [loadingDevs, setLoadingDevs] = useState(true);
    const [error, setError] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false); // State for confirmation dialog
    const [devToDelete, setDevToDelete] = useState(null); // State to store dev ID to delete

    useEffect(() => {
        // Fetch position details
        setLoadingPosition(true);
        axios
            .get(`http://localhost:8000/api/positions/${positionId}`)
            .then((res) => {
                setPosition(res.data);
                setLoadingPosition(false);
            })
            .catch((err) => {
                setError('Failed to load position');
                setLoadingPosition(false);
            });

        // Fetch matching developers
        setLoadingDevs(true);
        axios
            .get(`http://localhost:8000/api/positions/${positionId}/devs`)
            .then((res) => {
                setDevs(res.data);
                setLoadingDevs(false);
            })
            .catch((err) => {
                setError('Failed to load developers');
                setLoadingDevs(false);
            });
    }, [positionId]);

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
                // Assuming an API endpoint for deleting a developer by ID
                await axios.delete(`http://localhost:8000/api/devs/${devToDelete}`);
                setDevs(devs.filter((dev) => dev._id !== devToDelete));
                handleCloseConfirm();
            } catch (error) {
                console.error('Failed to delete developer:', error);
                // Optionally, set an error message to display to the user
                setError('Failed to delete developer.');
                handleCloseConfirm();
            }
        }
    };

    if (loadingPosition) return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <CircularProgress sx={{ mt: 4 }} />
            </SketchContainer>
        </ThemeProvider>
    );
    if (error) return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <Typography color="error" sx={{ color: 'red', fontFamily: '"Permanent Marker", cursive' }}>{error}</Typography>
            </SketchContainer>
        </ThemeProvider>
    );
    if (!position) return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <Typography sx={{ fontFamily: '"Permanent Marker", cursive' }}>No position found</Typography>
            </SketchContainer>
        </ThemeProvider>
    );

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <ContentBox>
                    <Typography variant="h4" gutterBottom>
                        {position.Name}
                    </Typography>

                    {/* Removed the Grid item for "Required Skills" and "Description" */}

                    {/* Available Developers section now takes full width */}
                    <Box mt={4}>
                        <Typography variant="h5" gutterBottom>
                            Available Developers
                        </Typography>
                        <Box mt={2}>
                            {loadingDevs ? (
                                <CircularProgress />
                            ) : devs.length === 0 ? (
                                <Typography sx={{ fontFamily: '"Permanent Marker", cursive' }}>No developers match this position's skills.</Typography>
                            ) : (
                                devs.map((dev) => (
                                    <Card key={dev._id} sx={{ marginBottom: 2 }}>
                                        <CardContent>
                                            <Grid container alignItems="flex-start" spacing={2}>
                                                <Grid item xs={10} sx={{ textAlign: 'left' }}> {/* Aligned to left */}
                                                    <Typography variant="h6" sx={{ color: '#ff8c00' }}>
                                                        <Link
                                                            to={`/devs/${dev._id}`}
                                                            style={{ color: '#ff8c00', textDecoration: 'none', fontFamily: '"Permanent Marker", cursive' }}
                                                        >
                                                            {dev.firstName} {dev.lastName}
                                                        </Link>
                                                    </Typography>

                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', marginY: 1 }}>
                                                        {Array.isArray(dev.languages) && dev.languages.length > 0
                                                            ? dev.languages.join(' • ')
                                                            : 'No languages'}
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        {dev.bio || 'No bio available'}
                                                    </Typography>
                                                </Grid>
                                               
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </Box>
                    </Box>
                </ContentBox>
            </SketchContainer>

          
        </ThemeProvider>
    );
};

export default PositionDetails;
