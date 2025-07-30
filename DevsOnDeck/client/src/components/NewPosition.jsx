import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Grid, Tooltip, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import your skill icons
import csharpImage from './icons/csharp.jpg';
import cssImage from './icons/css.png';
import goImage from './icons/go.jpg';
import htmlImage from './icons/html.jpg';
import javaImage from './icons/java.png';
import jsImage from './icons/js.png';
import pythImage from './icons/pyth.jpg';
import rubyImage from './icons/ruby.jpg';
import sqlImage from './icons/sql.png';
import swiftImage from './icons/swift.png';
import phpImage from './icons/php.png';
import cppImage from './icons/c++.png';

const skillIcons = [
  { skill: 'csharp', icon: csharpImage },
  { skill: 'css', icon: cssImage },
  { skill: 'go', icon: goImage },
  { skill: 'html', icon: htmlImage },
  { skill: 'java', icon: javaImage },
  { skill: 'js', icon: jsImage },
  { skill: 'pyth', icon: pythImage },
  { skill: 'ruby', icon: rubyImage },
  { skill: 'sql', icon: sqlImage },
  { skill: 'swift', icon: swiftImage },
  { skill: 'php', icon: phpImage },
  { skill: 'cpp', icon: cppImage },
];

const Newposition = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Skills: [],
  });

  const handleSkillClick = (skill) => {
    const updatedSkills = formData.Skills.includes(skill)
      ? formData.Skills.filter((s) => s !== skill)
      : [...formData.Skills, skill];

    if (updatedSkills.length <= 5) {
      setFormData({ ...formData, Skills: updatedSkills });
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.Name) errors.Name = 'Name is required';
    if (!data.Description) errors.Description = 'Description is required';
    if (!data.Skills || data.Skills.length === 0) errors.Skills = 'Please choose at least one skill';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.log('Validation failed:', errors);
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/positions', formData);
      navigate('/org/dashboard');
    } catch (error) {
      console.error('Failed to create position:', error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ padding: 4, borderRadius: 2, backgroundColor: '#fefefe' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ backgroundColor: '#72a9d4', padding: 2, borderRadius: 1, color: '#fff' }}>
          Add A Position
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            value={formData.Description}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" gutterBottom>
            Skills:
          </Typography>

          <Box sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              {skillIcons.map(({ skill, icon }) => (
                <Grid item xs={3} sm={2} key={skill}>
                  <Box
                    component="img"
                    src={icon}
                    alt={skill}
                    onClick={() => handleSkillClick(skill)}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: formData.Skills.includes(skill) ? '3px solid #1976d2' : '2px solid transparent',
                      transition: '0.2s',
                      '&:hover': {
                        borderColor: '#cb840aff',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Add Position
            </Button>
          </Box>

        </Box>
      </Card>
    </Container>
  );
};

export default Newposition;
