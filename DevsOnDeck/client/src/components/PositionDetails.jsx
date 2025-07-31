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
} from '@mui/material';

const PositionDetails = () => {
  const { positionId } = useParams();
  const [position, setPosition] = useState(null);
  const [devs, setDevs] = useState([]);
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [loadingDevs, setLoadingDevs] = useState(true);
  const [error, setError] = useState(null);

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

  if (loadingPosition) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!position) return <Typography>No position found</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom color="black">
         {position.Name}
        </Typography>

        <Typography variant="h6" gutterBottom color="black">
          Required Skills: {position.Skills?.join(', ') || 'None'}
        </Typography>
      </Box>

      <Box mt={4} textAlign="center">
        <Typography variant="h5" gutterBottom color="black">
          Available Developers
        </Typography>
      </Box>

      <Box mt={2}>
        {loadingDevs ? (
          <CircularProgress />
        ) : devs.length === 0 ? (
          <Typography>No developers match this position's skills.</Typography>
        ) : (
          devs.map((dev) => (
            <Card key={dev._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
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
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};

export default PositionDetails;
