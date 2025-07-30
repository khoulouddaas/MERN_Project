import axios from 'axios';
import { useEffect, useState } from 'react';
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
} from '@mui/material';

const DevList = () => {
  const [devList, setDevList] = useState([]);
  const [company, setCompany] = useState({});
  const [positions, setPositions] = useState([]);

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

  const handleDeleteDev = async (devId) => {
    if (window.confirm('Are you sure you want to delete this developer?')) {
      try {
        await axios.delete(`http://localhost:8000/api/devs/${devId}`);
        setDevList(devList.filter((dev) => dev._id !== devId));
      } catch (error) {
        console.error('Failed to delete developer:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Positions Column */}
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#3399ff', marginBottom: 2 }}
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
              {positions.map((pos) => (
                <ListItem key={pos._id} component={Link} to={`/positions/${pos._id}`} button>
                  <ListItemText primary={pos.Name} />
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                backgroundColor: '#fff89a',
                padding: 1,
                marginTop: 2,
                borderLeft: '5px solid red',
                fontSize: '0.875rem',
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
              sx={{ fontWeight: 'bold', backgroundColor: '#ccc', padding: 1 }}
            >
              Available Devs
            </Typography>
            <Box sx={{ maxHeight: 500, overflowY: 'auto', padding: 1 }}>
              {devList.length === 0 ? (
                <Typography>No developers found.</Typography>
              ) : (
                devList.map((dev) => (
                  <Card key={dev._id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Grid container alignItems="center">
                        {/* Left: Developer Info */}
                        <Grid item xs={10}>
                          <Typography variant="h6" sx={{ color: '#ff8c00' }}>
                            <Link
                              to={`/devs/${dev._id}`}
                              style={{ color: '#ff8c00', textDecoration: 'none' }}
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
                        <Grid item xs={2} textAlign="right">
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteDev(dev._id)}
                          >
                            Delete
                          </Button>
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
  );
};

export default DevList;
