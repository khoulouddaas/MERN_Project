import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DevProfile = () => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

  if (loading) return <Typography sx={{ color: 'black' }}>Loading profile...</Typography>;

  if (!developer) return <Typography sx={{ color: 'black' }}>Developer profile not found.</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: '#fff',          // white background
        color: 'black',           // black text
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3} sx={{ color: 'black' }}>
        {developer.firstName} {developer.lastName}'s Profile
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ color: 'black' }}>
        <strong>Email:</strong> {developer.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'black' }}>
        <strong>City:</strong> {developer.city}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'black' }}>
        <strong>State:</strong> {developer.state}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'black' }}>
        <strong>Address:</strong> {developer.address}
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
          Skills:
        </Typography>
        {developer.skills && developer.skills.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {developer.skills.map((skill, idx) => (
              <Paper
                key={idx}
                elevation={1}
                sx={{ px: 2, py: 0.5, borderRadius: 1, mb: 1, bgcolor: '#e0e0e0', color: 'black' }}
              >
                {skill.name || skill}
              </Paper>
            ))}
          </Stack>
        ) : (
          <Typography sx={{ color: 'black' }}>No skills added yet.</Typography>
        )}
      </Box>

      <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/devs/update/${developer._id}`)}>
          Edit Profile
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Profile
        </Button>
      </Stack>
    </Box>
  );
};

export default DevProfile;
