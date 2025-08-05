import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Stack, Paper, Card, CardContent, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Custom theme for the sketchy look
const sketchTheme = createTheme({
  typography: {
    fontFamily: '"Permanent Marker", cursive',
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

// Styled Box for the container to apply background and layout
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
  const navigate = useNavigate();

  useEffect(() => {
    // This assumes the user is logged in and the backend returns their profile
    axios.get('http://localhost:8000/api/devs', { withCredentials: true })
      .then(res => {
        setDeveloper(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/devs/login');
      });
  }, [navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile? This action is irreversible.")) {
      axios.delete(`http://localhost:8000/api/devs/${developer._id}`, { withCredentials: true })
        .then(() => {
          alert("Profile deleted successfully.");
          navigate('/devs/login');
        })
        .catch(err => {
          alert("Failed to delete profile.");
          console.error(err);
        });
    }
  };

  if (loading) return <Typography>Loading profile...</Typography>;
  if (!developer) return <Typography>Developer profile not found.</Typography>;

  return (
    <ThemeProvider theme={sketchTheme}>
      <SketchContainer>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              {developer.firstName} {developer.lastName}'s Profile
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {developer.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>City:</strong> {developer.city}
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
              {developer.skills && developer.skills.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {developer.skills.map((skill, idx) => (
                    <Paper
                      key={idx}
                      elevation={1}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: '#e0e0e0',
                        color: 'black',
                        border: '1px solid black',
                        boxShadow: '2px 2px 0px black',
                      }}
                    >
                      {skill.name || skill}
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Typography>No skills added yet.</Typography>
              )}
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
        </Container>
      </SketchContainer>
    </ThemeProvider>
  );
};

export default DevProfile;