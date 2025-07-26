import axios from 'axios';
import {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'

export const Developer =() => {
    const [oneDev, setOneDev] = useState({})
    const {id} = useParams()
    const nav = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/devs/'+ id)
            .then(res=> {
                console.log("Showing dev here:",res.data)
                setOneDev(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <Container component='main'>
            <CssBaseline/>
            <Box sx={{ marginTop: 8, display:'flex', flexDirection:'column'}}>
                <Typography component='h1' variant="h5" sx={{color: 'orange'}}>
                    {oneDev.firstName} {oneDev.lastName}
                </Typography>
                <Box sx={{
                    width: '100%',
                    mt: 3
                }}>
                    <Card sx={{width: '100%'}}>
                        <CardContent>
                            <Typography gutterBottom marginTop={1} variant="h8" component='div'>
                                Programming Language Skills:{oneDev.skills}
                            </Typography>
                            <Typography gutterBottom marginTop={1} variant="p" component='div'>
                                Personal Bio: {oneDev.biography}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Link to={`/update/${oneDev._id}`} style={{color: 'orange'}}>Add to your profile here!</Link>
                <Link to='/jobs' style={{color: 'orange'}}>Homepage</Link>
            </Box>
        </Container>
    )
}