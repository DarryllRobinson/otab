import React, { useState } from "react";
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
} from "@mui/material";
import {
  CheckCircleOutlineSharp,
  DangerousOutlined,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";

import { tileService } from "./tile.service";

//import useTimer from '../hooks/useTimer';

import "./Tile.css";

export default function Tile(props) {
  const {
    id,
    title,
    actualArtist,
    artists,
    tileBgColour,
    tileBgColourHover,
    tileBorderColour,
    tileTextColour,
    tileBorderRadius /*, setBox*/,
  } = props;

  // console.log('tileBgColour: ', tileBgColour);
  const [flipped, setFlipped] = useState(false);
  const [chosenArtist, setChosenArtist] = useState(props?.chosenArtist || "");
  // const [songValue, setSongValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Who's singing?");
  const [submitted, setSubmitted] = useState(props?.submitted || false);
  const [correctArtist, setCorrectArtist] = useState(
    props?.correctArtist || false
  );
  const [correctSong, setCorrectSong] = useState(false);

  const [disabled, setDisabled] = useState(false);

  // Font size setter based on length of title
  const size = title.length > 10 ? 12 : 16;

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleChange = (event) => {
    setChosenArtist(event.target.value);
    setHelperText("Lock it in!");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (chosenArtist === "") {
      setHelperText("Please choose an artist");
      setError(true);
    } else {
      setHelperText("Lock it in!");
      setError(false);
      setSubmitted(true);

      // Check if artist is correct
      const isCorrectArtist = chosenArtist === actualArtist;
      setCorrectArtist(isCorrectArtist);

      // Check if song is playing
      const currentSong = tileService.getSong();
      const isCorrectSong = title === currentSong.song;
      setCorrectSong(isCorrectSong);

      // Save the tile after updating the state
      saveTile(isCorrectArtist, isCorrectSong);

      handleClick();
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
    }
  };

  const saveTile = async (isCorrectArtist, isCorrectSong) => {
    try {
      await tileService.update(id, {
        id,
        chosenArtist,
        correctArtist: isCorrectArtist,
        correctSong: isCorrectSong,
        submitted: true,
      });
    } catch (error) {
      if (error.message === "Tile already submitted") {
        setHelperText("This tile has already been submitted.");
        setError(true);
      } else {
        setHelperText("An unexpected error occurred. Please try again.");
        setError(true);
      }
    }
  };

  const useStyles = makeStyles({ radioLabel: { fontSize: size } });
  const classes = useStyles();

  const renderArtists = artists.map((artist, id) => {
    //console.log(artist);
    return (
      <Typography key={id} sx={{ fontSize: size }}>
        <FormControlLabel
          value={artist}
          control={<Radio size="small" />}
          disabled={submitted}
          label={artist}
          onChange={handleChange}
          size="small"
          classes={{ label: classes.radioLabel }}
        />
      </Typography>
    );
  });

  const displayChosenArtist = () => {
    if (chosenArtist === "") {
      return;
    } else if (correctArtist) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chosenArtist}
          <Box
            sx={{
              position: "absolute",
              zIndex: "tooltip",
            }}
          >
            <CheckCircleOutlineSharp
              style={{ color: alpha("#34eb4c", 0.2) }}
              sx={{
                fontSize: 150,
              }}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chosenArtist}
          <Box
            sx={{
              position: "absolute",
              zIndex: "tooltip",
            }}
          >
            <DangerousOutlined
              style={{ color: alpha("#eb4334", 0.2) }}
              sx={{
                fontSize: 150,
              }}
            />
          </Box>
        </Box>
      );
    }
  };

  const displayBackTitle = () => {
    return (
      <FormLabel id="tile-song-title" sx={{ fontSize: size }}>
        {title}
      </FormLabel>
    );
  };

  return (
    <Box
      className={`flip-container ${flipped ? "flipped" : ""}`}
      data-testid="flip-container"
    >
      <form onSubmit={handleSubmit}>
        <div className="flipper">
          <div className="front" onClick={handleClick}>
            <Card
              sx={{
                "&:hover": {
                  backgroundColor: tileBgColourHover,
                  boxShadow: 10,
                },
                backgroundColor: tileBgColour,
                color: tileTextColour,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 1,
                borderColor: tileBorderColour,
                borderRadius: tileBorderRadius,
                height: 250,
                width: 200,
              }}
            >
              <CardContent>
                <Typography align="center" variant="h4" gutterBottom>
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
                borderRadius: tileBorderRadius,
                height: 250,
                width: 200,
              }}
            >
              <CardContent>
                <FormControl error={error}>
                  {displayBackTitle()}
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
                <Button
                  disabled={submitted || disabled}
                  type="submit"
                  variant="contained"
                >
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
