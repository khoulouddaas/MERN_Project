import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Skill icons
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

  const [errors, setErrors] = useState([]);

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
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(Object.values(validationErrors));
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/positions', formData);
      navigate('/org/dashboard');
    } catch (error) {
      setErrors([error.message || 'Failed to create position']);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3} color="textPrimary">
        Add A Position
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          sx={{ mb: 3 }}
          InputLabelProps={{ style: { color: 'black' } }}
          inputProps={{ style: { color: 'black' } }}
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
          InputLabelProps={{ style: { color: 'black' } }}
          inputProps={{ style: { color: 'black' } }}
        />

        <Typography variant="h6" gutterBottom color="textPrimary" mb={1}>
          Skills (Select up to 5)
        </Typography>

        <Box
          sx={{
            maxHeight: 200,
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            mb: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          {skillIcons.map(({ skill, icon }) => (
            <Box
              key={skill}
              component="img"
              src={icon}
              alt={skill}
              onClick={() => handleSkillClick(skill)}
              sx={{
                width: 48,
                height: 48,
                cursor: 'pointer',
                borderRadius: 1,
                border: formData.Skills.includes(skill)
                  ? '3px solid green'
                  : '2px solid transparent',
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderColor: 'green',
                },
              }}
            />
          ))}
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined" onClick={() => navigate('/org/dashboard')}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Position
          </Button>
        </Stack>

        {errors.length > 0 && (
          <Box mt={3} color="error.main">
            {errors.map((err, idx) => (
              <Typography key={idx} variant="body2" color="error" textAlign="center">
                {err}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Newposition;
