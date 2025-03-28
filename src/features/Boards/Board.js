import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import Tile from "../Tiles/Tile";
import { tileService } from "../Tiles/tile.service";

// Retrieve song title and artist from radio db/api

// Mocked data
const numTiles = 25;
const numArtists = 2;

const songsDb = [
  {
    id: 0,
    title: "First song with a very long title",
    artist: "First Actual Artist",
    fake: false,
  },
  {
    id: 1,
    title: "Second song with a very long title",
    artist: "Second Actual Artist",
    fake: false,
  },
  {
    id: 2,
    title: "Third song with a very long title",
    artist: "Third Actual Artist",
    fake: false,
  },
  {
    id: 3,
    title: "Fourth song with a very long title",
    artist: "Fourth Actual Artist",
    fake: false,
  },
  {
    id: 4,
    title: "Fifth song",
    artist: "Fifth Actual Artist",
    fake: false,
  },
  {
    id: 5,
    title: "Sixth song",
    artist: "Sixth Actual Artist",
    fake: false,
  },
  {
    id: 6,
    title: "7th song",
    artist: "7th Actual Artist",
    fake: false,
  },
  {
    id: 7,
    title: "8th song",
    artist: "8th Actual Artist",
    fake: false,
  },
  {
    id: 8,
    title: "9th song",
    artist: "9th Actual Artist",
    fake: false,
  },
  {
    id: 9,
    title: "10th song",
    artist: "10th Actual Artist",
    fake: false,
  },
  {
    id: 10,
    title: "11th song",
    artist: "11th Actual Artist",
    fake: false,
  },
  {
    id: 11,
    title: "12th song",
    artist: "12th Actual Artist",
    fake: false,
  },
  {
    id: 12,
    title: "13th song",
    artist: "13th Actual Artist",
    fake: false,
  },
  {
    id: 13,
    title: "14th song",
    artist: "14th Actual Artist",
    fake: false,
  },
  {
    id: 14,
    title: "15th song",
    artist: "15th Actual Artist",
    fake: false,
  },
  {
    id: 15,
    title: "16th song",
    artist: "16th Actual Artist",
    fake: false,
  },
  {
    id: 16,
    title: "17th song",
    artist: "17th Actual Artist",
    fake: false,
  },
  {
    id: 17,
    title: "18th song",
    artist: "18th Actual Artist",
    fake: false,
  },
  {
    id: 18,
    title: "19th song",
    artist: "19th Actual Artist",
    fake: false,
  },
  {
    id: 19,
    title: "20th song",
    artist: "20th Actual Artist",
    fake: false,
  },
  {
    id: 20,
    title: "21st song",
    artist: "21st Actual Artist",
    fake: false,
  },
  {
    id: 21,
    title: "22nd song",
    artist: "22nd Actual Artist",
    fake: false,
  },
  {
    id: 22,
    title: "23rd song",
    artist: "23rd Actual Artist",
    fake: false,
  },
  {
    id: 23,
    title: "24th song",
    artist: "24th Actual Artist",
    fake: false,
  },
  {
    id: 24,
    title: "25th song",
    artist: "25th Actual Artist",
    fake: false,
  },
];

const fakeArtistsDb = [
  {
    id: 0,
    artist: "Fake Artist 0",
    fake: true,
  },
  {
    id: 1,
    artist: "Fake Artist 1",
    fake: true,
  },
  {
    id: 2,
    artist: "Fake Artist 2",
    fake: true,
  },
  {
    id: 3,
    artist: "Fake Artist 3",
    fake: true,
  },
  {
    id: 4,
    artist: "Fake Artist 4",
    fake: true,
  },
  {
    id: 5,
    artist: "Fake Artist 5",
    fake: true,
  },
  {
    id: 6,
    artist: "Fake Artist 6",
    fake: true,
  },
  {
    id: 7,
    artist: "Fake Artist 7",
    fake: true,
  },
  {
    id: 8,
    artist: "Fake Artist 8",
    fake: true,
  },
  {
    id: 9,
    artist: "Fake Artist 9",
    fake: true,
  },
  {
    id: 10,
    artist: "Fake Artist 10",
    fake: true,
  },
  {
    id: 11,
    artist: "Fake Artist 11",
    fake: true,
  },
  {
    id: 12,
    artist: "Fake Artist 12",
    fake: true,
  },
  {
    id: 13,
    artist: "Fake Artist 13",
    fake: true,
  },
  {
    id: 14,
    artist: "Fake Artist 14",
    fake: true,
  },
  {
    id: 15,
    artist: "Fake Artist 15",
    fake: true,
  },
  {
    id: 16,
    artist: "Fake Artist 16",
    fake: true,
  },
  {
    id: 17,
    artist: "Fake Artist 17",
    fake: true,
  },
  {
    id: 18,
    artist: "Fake Artist 18",
    fake: true,
  },
  {
    id: 19,
    artist: "Fake Artist 19",
    fake: true,
  },
];

export default function Board(props) {
  const { boardId } = props || {};
  const [status, setStatus] = useState("idle");
  const [tiles, setTiles] = useState([]);
  const [chosenTheme, setChosenTheme] = useState("Babyblue");

  // Setting the theme for the board
  const theme = useTheme();
  const { themes } = theme.palette;
  const boardTheme = themes.find((x) => x.theming === chosenTheme);
  const {
    boardBgColour,
    boardBorderColour,
    tileBgColour,
    tileBgColourHover,
    tileBorderColour,
    tileTextColour,
    tileBorderRadius,
    tileSpacing,
  } = boardTheme;

  // Display part of the theme buttons
  const renderThemeButtons = themes.map((theme, id) => {
    const { theming } = theme;
    return (
      <Button
        key={id}
        onClick={() => {
          setChosenTheme(theming);
        }}
      >
        {theming}
      </Button>
    );
  });

  const fetchTiles = useCallback(async (boardId) => {
    setStatus("fetching");
    const records = await tileService.getTiles(boardId);
    setStatus("succeeded");
    setTiles(records);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      fetchTiles(boardId);
    }
  }, [boardId, fetchTiles, status]);

  const renderTiles = () => {
    return tiles.map((tile, key) => {
      const picker = key % tileBgColour.length;
      const { id, title, actualArtist, artists } = tile;
      return (
        <Grid className="tile grid" key={key} item xs={12 / 5}>
          <Tile
            key={key}
            id={id}
            title={title}
            actualArtist={actualArtist}
            artists={artists}
            tileBgColour={tileBgColour[picker]}
            tileBgColourHover={tileBgColourHover[picker]}
            tileBorderColour={tileBorderColour[picker]}
            tileTextColour={tileTextColour[picker]}
            tileBorderRadius={tileBorderRadius}
          />
        </Grid>
      );
    });
  };

  let content;
  if (status === "fetching") {
    content = (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  } else if (status === "error") {
    content = (
      <Typography
        variant="body1"
        color="error"
        sx={{ textAlign: "center", mt: 4 }}
      >
        Error loading tiles.
      </Typography>
    );
  } else if (status === "succeeded" && tiles.length > 0) {
    content = renderTiles();
  } else {
    content = (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        No tiles found.
      </Typography>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <ButtonGroup variant="outlined" aria-label="Theming button group">
          {renderThemeButtons}
        </ButtonGroup>
      </Box>
      <Box
        className="board"
        aria-label="board"
        sx={{
          backgroundColor: boardBgColour,
          borderColor: boardBorderColour,
          borderRadius: 5,
          my: 2,
          p: 2,
        }}
      >
        <Grid
          className="board grid"
          container
          spacing={tileSpacing}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {content}
        </Grid>
      </Box>
    </Container>
  );
}
