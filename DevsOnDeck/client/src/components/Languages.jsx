import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
  Container,
  Stack,
} from '@mui/material';

// Import icons
import cssIcon from './icons/css.png';
import csharpIcon from './icons/csharp.jpg';
import goIcon from './icons/go.jpg';
import htmlIcon from './icons/html.jpg';
import javaIcon from './icons/java.png';
import jsIcon from './icons/js.png';
import pythonIcon from './icons/pyth.jpg';
import rubyIcon from './icons/ruby.jpg';
import sqlIcon from './icons/sql.png';
import swiftIcon from './icons/swift.png';
import phpIcon from './icons/php.png';
import cppIcon from './icons/c++.png';

const languageOptions = [
  { name: 'csharp', icon: csharpIcon },
  { name: 'css', icon: cssIcon },
  { name: 'go', icon: goIcon },
  { name: 'html', icon: htmlIcon },
  { name: 'java', icon: javaIcon },
  { name: 'js', icon: jsIcon },
  { name: 'python', icon: pythonIcon },
  { name: 'ruby', icon: rubyIcon },
  { name: 'sql', icon: sqlIcon },
  { name: 'swift', icon: swiftIcon },
  { name: 'php', icon: phpIcon },
  { name: 'c++', icon: cppIcon },
];

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { devId } = useParams();

  const handleAddLang = (lang) => {
    if (languages.length < 5 && !languages.includes(lang)) {
      setLanguages([...languages, lang]);
    }
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:8000/api/skills/languages/${devId}`, {
      languages,
      bio,
    })
      .then(() => navigate('/'))
      .catch(err => {
        const errs = err.response?.data?.errors;
        const messages = errs ? Object.values(errs).map(e => e.message) : ['Unexpected error'];
        setErrors(messages);
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2} color="textPrimary">
        Add Your Skills
      </Typography>

      <Typography variant="h6" mb={1} color="textPrimary">
        Pick Your Top 5 Languages
      </Typography>

      {/* Selected language row */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1, minHeight: 60, mb: 3 }}
      >
        {languages.map((lang, idx) => {
          const img = languageOptions.find(l => l.name === lang)?.icon;
          return <Avatar key={idx} src={img} alt={lang} sx={{ width: 40, height: 40 }} />;
        })}
      </Box>

      <Grid container spacing={2}>
        {languageOptions.map((langObj) => (
          <Grid item xs={3} sm={2} key={langObj.name}>
            <Avatar
              src={langObj.icon}
              alt={langObj.name}
              onClick={() => handleAddLang(langObj.name)}
              sx={{
                width: 48,
                height: 48,
                cursor: 'pointer',
                border: languages.includes(langObj.name) ? '2px solid green' : 'none',
              }}
            />
            <Typography variant="caption" display="block" textAlign="center" color="textPrimary">
              {langObj.name.toUpperCase()}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Bio box */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom color="textPrimary">
          Short Bio
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder="Add more about yourself here..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          sx={{
            input: { color: 'black' },
          }}
        />
      </Box>

      {/* Buttons */}
      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button variant="outlined" onClick={() => navigate('/devs/login')}>
          Skip This Step
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
         Finished
        </Button>
      </Stack>

      {/* Error messages */}
      {errors.length > 0 && (
        <Box mt={2} color="red">
          {errors.map((err, idx) => (
            <Typography key={idx} variant="body2" color="error">
              {err}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Languages;
