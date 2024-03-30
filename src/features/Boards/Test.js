import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

import { experimentalStyled as styled } from '@mui/material/styles';

export default function Test(props) {
  const [chosenTheme, setChosenTheme] = useState('Babyblue');

  // Setting the theme for the board
  const theme = useTheme();
  const { themes } = theme.palette;
  const boardTheme = themes.find((x) => x.theming === chosenTheme);
  //   console.log('boardTheme: ', boardTheme);
  const { boardBgColour, boardBorderColour } = boardTheme;
  //   console.log('boardBgColour: ', boardBgColour);

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

  const commonStyles = {
    border: 1,
    // width: '5rem',
    // height: '5rem',
  };

  // const displayGrids =

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container>
      <ButtonGroup variant="outlined" aria-label="Theming button group">
        {renderThemeButtons}
      </ButtonGroup>
      <Box
        className="board"
        sx={{
          ...commonStyles,
          bgcolor: boardBgColour,
          borderColor: boardBorderColour,
        }}
      >
        <Grid container>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
