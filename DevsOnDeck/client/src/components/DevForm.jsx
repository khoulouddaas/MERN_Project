import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, FormControl, InputLabel, Input, Button } from '@mui/material'

export const UpdateDev = (props) => {
    const { id } = useParams();
    const [skills, setSkills] = useState()
    const [biography, setBiography] = useState()
    const nav = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/devs/' + id)
            .then(res => {
                console.log(res.data)
                setSkills(res.data.skills)
                setBiography(res.data.biography)
            })
            .catch(err => console.log(err))
    }, [id])

    const updateDev = (e) => {
        e.preventDefault()
        console.log("is this updating");
        axios.put('http://localhost:8000/api/devs/' + id, {
            skills,
            biography
        })
            .then(res => console.log(res))
        console.log("Updated!")
            .then(() => nav('/devs/' + id))
    }

    return (
        <Container maxWidth='sm'>
            <form onSubmit={updateDev}>
                <FormControl>
                    <InputLabel htmlFor='skills'>Skills:</InputLabel>
                    <Input type='text' name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='type'>More About Me:</InputLabel>
                    <Input type='text-area' name="biography" value={biography} onChange={(e) => setBiography(e.target.value)} />
                </FormControl>
                <Button style={{ color: 'orange' }}>Add Skills!</Button>
            </form>
        </Container>
    )
}
