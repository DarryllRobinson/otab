import React, { useState, useMemo } from "react";
import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import Tile from "../Tiles/Tile";
import ThemeButtons from "../common/ThemeButtons"; // Import reusable component

export default function Board(props) {
  const { tiles } = props || {};
  const [chosenTheme, setChosenTheme] = useState("Babyblue");

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

  const renderTiles = useMemo(() => {
    return tiles.map((tile, key) => {
      const picker = key % tileBgColour.length;
      const {
        id,
        actualArtist,
        title,
        correctArtist,
        artists,
        submitted,
        chosenArtist,
      } = tile;
      return (
        <Grid
          className="tile grid"
          key={key}
          item
          xs={12 / 5}
          role="listitem"
          aria-label={`Tile ${key + 1}`}
        >
          <Tile
            id={id}
            title={title}
            actualArtist={actualArtist}
            correctArtist={correctArtist}
            chosenArtist={chosenArtist}
            artists={artists}
            submitted={submitted}
            tileBgColour={tileBgColour[picker]}
            tileBgColourHover={tileBgColourHover[picker]}
            tileBorderColour={tileBorderColour[picker]}
            tileTextColour={tileTextColour[picker]}
            tileBorderRadius={tileBorderRadius}
          />
        </Grid>
      );
    });
  }, [
    tiles,
    tileBgColour,
    tileBgColourHover,
    tileBorderColour,
    tileTextColour,
    tileBorderRadius,
  ]);

  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <ThemeButtons
          themes={themes}
          chosenTheme={chosenTheme}
          setChosenTheme={setChosenTheme}
        />
      </Box>
      <Box
        className="board"
        aria-label="Game board"
        role="list"
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
          {tiles.length > 0 ? (
            renderTiles
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center" }}
              role="alert"
              aria-live="polite"
            >
              No tiles found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
