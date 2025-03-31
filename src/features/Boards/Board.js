import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import Tile from "../Tiles/Tile";

export default function Board(props) {
  const { tiles } = props || {};
  // console.log("tiles: ", tiles);
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

  const renderTiles = () => {
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
        <Grid className="tile grid" key={key} item xs={12 / 5}>
          <Tile
            key={key}
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
  };

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
          {tiles.length > 0 ? (
            renderTiles()
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              No tiles found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
