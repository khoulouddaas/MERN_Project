import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    Stack
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look (copied from previous components)
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

const DevList = () => {
    const [devList, setDevList] = useState([]);
    const [company, setCompany] = useState({});
    const [positions, setPositions] = useState([]);
    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [loadingPositionId, setLoadingPositionId] = useState(null);
    const [devCache, setDevCache] = useState({});

    const nav = useNavigate();

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

    // Load devs with skills initially if you want - optional
    // Or just wait for a position click to load devs

    const handlePositionClick = async (positionId) => {
        if (loadingPositionId === positionId) return; // Prevent repeated click spam

        setSelectedPositionId(positionId);

        // Check cache first
        if (devCache[positionId]) {
            setDevList(devCache[positionId]);
            return;
        }

        try {
            setLoadingPositionId(positionId);
            const res = await axios.get(`http://localhost:8000/api/positions/${positionId}/devs`);
            setDevList(res.data);
            setDevCache((prev) => ({ ...prev, [positionId]: res.data }));
        } catch (error) {
            console.error('Error fetching devs:', error);
            setDevList([]);
        } finally {
            setLoadingPositionId(null);
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
                                    backgroundColor: '#3399ff',
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
                                onClick={() => nav('/jobs/create')}
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
                                                button
                                                selected={selectedPositionId === pos._id}
                                                onClick={() => handlePositionClick(pos._id)}
                                                sx={{
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '4px',
                                                    marginBottom: '8px',
                                                    cursor: loadingPositionId === pos._id ? 'wait' : 'pointer',
                                                    backgroundColor:
                                                        selectedPositionId === pos._id ? '#a4bcd3ff' : 'inherit',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            selectedPositionId === pos._id ? '#a4bcd3ff' : '#f5f5f5',
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={pos.Name}
                                                    sx={{ fontFamily: '"Permanent Marker", cursive' }}
                                                />
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
                                        <Typography sx={{ fontFamily: '"Permanent Marker", cursive' }}>
Please choose a position to see our available developers.                                        </Typography>
                                    ) : (
                                        devList.map((dev) => (
                                            <Card key={dev._id} sx={{ marginBottom: 2 }}>
                                                <CardContent>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={10}>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ color: '#ff8c00', fontFamily: '"Permanent Marker", cursive' }}
                                                            >
                                                                {dev.firstName} {dev.lastName}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{ fontWeight: 'bold', marginY: 1, fontFamily: '"Permanent Marker", cursive' }}
                                                            >
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
