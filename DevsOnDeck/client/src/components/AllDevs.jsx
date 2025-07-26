import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AllDevs = (props) => {
    const [devList, setDevList] = useState([])
    const [company, setCompany] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/devs/allDevs')
            .then(res => {
                console.log(res.data)
                setDevList(res.data)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/company', { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setCompany(res.data)
            })
    }, [])
    const nav = useNavigate()

    return (
        <Container>
            <Typography sx={{ marginBottom: '10px' }} component='h1' variant='h5'>
                Hello {company.name}! Here are all available developers ready to work! <br/>
                <Link to='/jobs/create' style={{color: 'orange', textDecoration:'none'}}>List a New Position?</Link>
            </Typography>

            <Grid container spacing={8}>
                {
                    devList.length > 0 && devList.map((dev, index) => {
                        return (
                            <Grid item key={dev} xs={12} sm={6} md={6}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography gutterBottom marginTop={1} variant="h8" component='div' sx={{ color: 'orange' }}>
                                            <Link to={'/devs/' + dev._id} style={{ color: 'orange' }}>{dev.firstName}</Link>
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component='div'>
                                            {dev.skills}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component='div'>
                                            {dev.biography}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
            </Grid>
        </Container>
    )
}

export default AllDevs