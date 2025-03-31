import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { debounce } from "lodash";

import { tileService } from "./tile.service";

import "./Tile.css";

// Move debounce outside the component
const debouncedFlip = debounce((setFlipped) => {
  setFlipped((prev) => !prev);
}, 300);

export default React.memo(function Tile(props) {
  const {
    id,
    title,
    actualArtist,
    artists,
    tileBgColour,
    tileBgColourHover,
    tileBorderColour,
    tileTextColour,
    tileBorderRadius,
  } = props;

  const [flipped, setFlipped] = useState(false);
  const [submitted, setSubmitted] = useState(
    props.submitted === 1 ? true : false
  );
  const [chosenArtist, setChosenArtist] = useState(
    submitted ? props.chosenArtist : ""
  );
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Who's singing?");
  const [correctArtist, setCorrectArtist] = useState(props.correctArtist);
  const [correctSong, setCorrectSong] = useState(false);
  const [checksComplete, setChecksComplete] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const size = title.length > 10 ? 12 : 16;

  const handleClick = useCallback(() => debouncedFlip(setFlipped), []);

  const handleChange = (event) => {
    setChosenArtist(event.target.value);
    setHelperText("Lock it in!");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!chosenArtist) {
      setHelperText("Please choose an artist");
      setError(true);
      return;
    }

    setHelperText("Lock it in!");
    setError(false);
    setSubmitted(true);
    checkArtist(chosenArtist);
    checkSong(title);
    setChecksComplete(true);

    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);
  };

  const checkArtist = (chosenArtist) => {
    const check = chosenArtist === actualArtist;
    setCorrectArtist(check);
  };

  const checkSong = (title) => {
    const currentSong = tileService.getSong();
    const check = title === currentSong.song;
    setCorrectSong(check);
  };

  const saveTile = useCallback(() => {
    tileService.update(id, {
      id,
      actualArtist,
      chosenArtist,
      correctArtist,
      correctSong,
      submitted: true,
    });
  }, [id, actualArtist, chosenArtist, correctArtist, correctSong]);

  useEffect(() => {
    if (checksComplete) {
      saveTile();
      handleClick(); // Flip the tile back
      setChecksComplete(false); // Reset after saving
    }
  }, [checksComplete, saveTile, handleClick]);

  const useStyles = makeStyles({ radioLabel: { fontSize: size } });
  const classes = useStyles();

  const ArtistOptions = useMemo(() => {
    return artists.map((artist, index) => (
      <Typography key={index} sx={{ fontSize: size }}>
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
    ));
  }, [artists, submitted, size, classes]);

  const displayChosenArtist = () => {
    if (!chosenArtist) return null;

    const icon = correctArtist ? (
      <CheckCircleOutlineSharp
        style={{ color: alpha("#34eb4c", 0.2) }}
        sx={{ fontSize: 150 }}
      />
    ) : (
      <DangerousOutlined
        style={{ color: alpha("#eb4334", 0.2) }}
        sx={{ fontSize: 150 }}
      />
    );

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
          {icon}
        </Box>
      </Box>
    );
  };

  const displayBackTitle = () => (
    <FormLabel id="tile-song-title" sx={{ fontSize: size }}>
      {title}
    </FormLabel>
  );

  return (
    <Box className={`flip-container ${flipped ? "flipped" : ""}`}>
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
                    {ArtistOptions}
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
});
