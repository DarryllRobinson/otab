import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  useTheme,
} from '@mui/material';
import { boardService } from './board.service';
import { userService } from '../users/user.service';

export default function BoardCreate(props) {
  console.log('Board props: ', props);
  const { compId } = props;
  const user = userService.userValue;
  //   console.log('user: ', user);
  const [status, setStatus] = useState('idle');
  const [boardId, setBoardId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [chosenTheme, setChosenTheme] = useState('Babyblue');
  const [tiles, setTiles] = useState(null);

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
    // console.log('theme: ', theme);
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

  const createBoard = useCallback(async (compId, userId) => {
    setStatus('fetching');
    const board = await boardService.create({
      competitionId: compId,
      userId,
    });

    setStatus('succeeded');
    setBoardId(board.id);

    // Fetch randon song title and artist per numTiles
    setSongs(selectRandomSongs());
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      createBoard(compId, user.id);
    }
  }, [compId, createBoard, status, user.id]);

  const selectRandomSongs = () => {
    return ['songs'];
  };

  return (
    <Container>
      <ButtonGroup variant="outlined" aria-label="Theming button group">
        {renderThemeButtons}
      </ButtonGroup>
      <Box
        className="board"
        aria-label="board"
        sx={{
          backgroundColor: boardBgColour,
          borderColor: boardBorderColour,
          // borderRadius: 5,
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
          {/*console.log(theme.palette)*/}
          {/* {renderTiles} */}
        </Grid>
      </Box>
    </Container>
  );
}
