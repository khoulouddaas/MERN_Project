import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Stack, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// Custom red marker icon - using an inline SVG for better reliability
const redMarker = new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg' viewBox='0%200%2032%2032'%3E%3Cpath fill='%23FF0000' d='M16%200c-8.837%200-16%207.163-16%2016s16%2016%2016%2016%2016-7.163%2016-16-7.163-16-16-16zM16%2010c3.314%200%206%202.686%206%206s-2.686%206-6%206-6-2.686-6-6%202.686-6%206-6z'/%3E%3C/svg%3E",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -40]
});


// Sketchy theme for Material-UI components
const sketchTheme = createTheme({
    typography: {
        fontFamily: '"Permanent Marker", cursive',
    },
    components: {
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

// Styled container for the entire page
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

const DevProfile = () => {
    const [developer, setDeveloper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cityCoords, setCityCoords] = useState(null);
    const [organizationCityForMap, setOrganizationCityForMap] = useState(null); // New state for organization city
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/devs', { withCredentials: true })
            .then(res => {
                setDeveloper(res.data);
                setLoading(false);

                // Determine which city to use for the map
                // Prioritize organization city from the developer data if available
                let cityToMap = res.data.organization?.city;

                // Fallback to developer's city if organization city is not found
                if (!cityToMap) {
                    cityToMap = res.data.city;
                    console.warn("Organization city not found in developer data. Falling back to developer's city for map.");
                }

                // Further fallback to a default city if neither is available (for demonstration)
                if (!cityToMap) {
                    cityToMap = "San Francisco"; // A default city for the map
                    console.warn("No city found for organization or developer. Using default city 'San Francisco' for map.");
                }

                setOrganizationCityForMap(cityToMap); // Store the chosen city for the map

                // Fetch coordinates for the determined city
                if (cityToMap) {
                    fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityToMap)}&format=json&limit=1`)
                        .then(geoRes => geoRes.json())
                        .then(geoData => {
                            if (geoData.length > 0) {
                                setCityCoords([parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)]);
                            } else {
                                console.warn(`No coordinates found for city: ${cityToMap}`);
                            }
                        })
                        .catch(err => console.error("Failed to fetch coordinates:", err));
                }
            })
            .catch((err) => {
                console.error("Error fetching developer profile:", err);
                setLoading(false);
                // Redirect to login if not authenticated or profile not found
                navigate('/devs/login');
            });
    }, [navigate]); // Dependency array ensures effect runs when navigate changes

    // Handles profile deletion
    const handleDelete = () => {
        // Using a custom confirmation message via prompt
        const isConfirmed = prompt("Are you sure you want to delete your profile? Type 'DELETE' to confirm.");
        if (isConfirmed === "DELETE") {
            axios.delete(`http://localhost:8000/api/devs/${developer._id}`, { withCredentials: true })
                .then(() => {
                    // Simple alert for success message
                    alert("Profile deleted successfully.");
                    navigate('/devs/login');
                })
                .catch(err => {
                    alert("Failed to delete profile.");
                    console.error(err);
                });
        } else {
            alert("Profile deletion cancelled.");
        }
    };

    if (loading) return <Typography>Loading profile...</Typography>;
    if (!developer) return <Typography>Developer profile not found. Please log in.</Typography>;

    return (
        <ThemeProvider theme={sketchTheme}>
            <SketchContainer>
                <Container maxWidth="lg"> {/* Changed to maxWidth="lg" to give more space for side-by-side */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on medium and up
                        spacing={4} // Space between the two Paper components
                        alignItems="flex-start" // Align items to the top
                    >
                        {/* Main profile details container */}
                        <Paper elevation={3} sx={{ padding: 4, flex: 1, minWidth: { xs: '100%', md: '45%' } }}>
                            <Typography variant="h4" textAlign="center" gutterBottom>
                                {developer.firstName} {developer.lastName}'s Profile
                            </Typography>
                            <Box sx={{ marginTop: 4 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Email:</strong> {developer.email}
                                </Typography>
                                
                                <Typography variant="body1" gutterBottom>
                                    <strong>State:</strong> {developer.state}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Address:</strong> {developer.address}
                                </Typography>
                            </Box>

                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    Skills:
                                </Typography>
                                
                                                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', marginY: 1 }}>
{Array.isArray(developer.skills) && developer.skills.length > 0
    ? developer.skills.map(skill => skill.language).join(' • ')
    : 'No languages'}

                                                                                    </Typography>
                            </Box>

                            <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
                                <Button variant="contained" color="primary" onClick={() => navigate(`/devs/update/${developer._id}`)}>
                                    Edit Profile
                                </Button>
                                <Button variant="contained" color="error" onClick={handleDelete} sx={{ backgroundColor: '#f44336' }}>
                                    Delete Profile
                                </Button>
                            </Stack>
                        </Paper>

                        {/* Separated and smaller Map Section displaying organization city */}
                        {cityCoords && organizationCityForMap && (
                            <Paper elevation={3} sx={{ padding: 4, flex: 1, minWidth: { xs: '100%', md: '45%' } }}>
                                <Typography variant="h5" textAlign="center" gutterBottom>
                                    Organization Location
                                </Typography>
                                <Box sx={{ height: 250, border: '2px solid black', borderRadius: '8px', overflow: 'hidden' }}> {/* Adjusted height to 250px */}
                                    <MapContainer center={cityCoords} zoom={12} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker position={cityCoords} icon={redMarker}>
                                            <Popup>
                                                Organization in {organizationCityForMap} {/* Displays the organization city */}
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </Box>
                            </Paper>
                        )}
                    </Stack>
                </Container>
            </SketchContainer>
        </ThemeProvider>
    );
};

export default DevProfile;
