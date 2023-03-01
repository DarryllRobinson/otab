import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {
  CheckCircleOutlineSharp,
  DangerousOutlined,
} from '@mui/icons-material/';
import { useTheme } from '@mui/material/styles';

import './Tile.css';

export default function Tile(props) {
  const theme = useTheme();
  const { title, actualArtist, artists } = props;
  const [flipped, setFlipped] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Who's singing?");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText('Lock it in!');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === '') {
      setHelperText('Please choose an artist');
      setError(true);
    } else {
      setHelperText('Lock it in!');
      setError(false);

      setSubmitted(true);
      checkArtist();
      handleClick();
    }
  };

  const displayChosenArtist = () => {
    if (value === '') {
      return;
    } else if (correct) {
      return (
        <Box sx={{ height: 250, width: 200 }}>
          <Box>{value}</Box>
          <Box>
            <CheckCircleOutlineSharp color="success" fontSize="large" />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={{ height: 250, width: 200 }}>
          <Box>{value}</Box>
          <Box>
            <DangerousOutlined color="error" fontSize="large" />
          </Box>
        </Box>
      );
    }
  };

  const checkArtist = () => {
    const check = value === actualArtist ? true : false;
    setCorrect(check);
  };

  const renderArtists = artists.map((artist, id) => {
    return (
      <FormControlLabel
        key={id}
        value={artist}
        control={<Radio size="small" />}
        disabled={submitted}
        label={artist}
        onChange={handleChange}
        size="small"
      />
    );
  });

  return (
    <Box className={`flip-container ${flipped ? 'flipped' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="flipper">
          <div className="front" onClick={handleClick}>
            <Card
              sx={{
                '&:hover': {
                  boxShadow: 10,
                },
                border: 1,
                borderRadius: 3,
                height: 250,
                width: 200,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {displayChosenArtist()}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="back">
            <Card
              sx={{
                border: 1,
                borderRadius: 3,
                height: 250,
                width: 200,
              }}
            >
              <CardContent>
                <FormControl error={error}>
                  <FormLabel id="tile-song-title">{title}</FormLabel>
                  <RadioGroup
                    aria-labelledby="artists-radio-group-label"
                    name="radio-buttons-group"
                  >
                    {renderArtists}
                  </RadioGroup>
                  {!submitted && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
              </CardContent>
              <CardActions>
                <Button disabled={submitted} type="submit" variant="contained">
                  Submit
                </Button>
                <Button variant="outlined" onClick={handleClick}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </form>
    </Box>
  );
}
