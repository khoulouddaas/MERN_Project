import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Container, Grid } from "@mui/material"

const DevList = (props) => {
  const [devList, setDevList] = useState([])
  const [company, setCompany] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8000/api/devswithskills')
      .then(res => {
        console.log('Developers with skills:', res.data)
        setDevList(res.data)
      })
      .catch(err => {
        console.error('Error fetching devs with skills:', err)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/org/allOrganizations', { withCredentials: true })
      .then(res => {
        console.log('Company data:', res.data)
        setCompany(res.data)
      })
      .catch(err => {
        console.error('Error fetching company:', err)
      })
  }, [])

  const nav = useNavigate()

  return (
    <Container>
      <Typography sx={{ marginBottom: '10px' }} component='h1' variant='h5'>
        Hello {company.name || 'there'}! Here are all available developers ready to work! <br />
        <Link to='/jobs/create' style={{ color: 'orange', textDecoration: 'none' }}>List a New Position?</Link>
      </Typography>

      {devList.length === 0 && (
        <Typography>No developers found.</Typography>
      )}

      <Grid container spacing={8}>
        {devList.length > 0 && devList.map((dev) => (
          <Grid item key={dev._id} xs={12} sm={6} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography gutterBottom marginTop={1} variant="h6" component='div' sx={{ color: 'orange' }}>
                  <Link to={'/devs/' + dev._id} style={{ color: 'orange' }}>
                    {dev.firstName} {dev.lastName}
                  </Link>
                </Typography>

                <Typography gutterBottom variant="body1" component='div'>
                  {Array.isArray(dev.languages) && dev.languages.length > 0
                    ? dev.languages.join(', ')
                    : 'No languages'}
                </Typography>

                <Typography gutterBottom variant="body2" component='div'>
                  {dev.bio || 'No bio available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default DevList
