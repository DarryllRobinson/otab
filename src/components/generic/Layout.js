import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from './Copyright';
import AlertComp from './Alert';
import NavbarLayout from '../navigation/NavbarLayout';
import { userService } from '../../features/Users/user.service';

// Define theme settings
const light = {
  palette: {
    mode: 'light',
    // boardBorder: 'solid 3px #192024',
    // boardBackgroundColor: '#192024',
    themes: [
      {
        theming: 'Babyblue',
        boardBgColour: '#9bccea',
        boardBorderColour: '#9bccea',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff'],
        tileBgColourHover: ['#cccccc'],
        tileBorderColour: ['#dbeef4'],
        tileTextColour: ['#337a98'],
        tileSpacing: 0.5,
        tileBorderRadius: 0,
      },
      {
        theming: 'Vintage',
        boardBgColour: '#e6d6bd',
        boardBorderColour: '#221f17',
        boardBgColourTransition: '#d9d0bf',
        tileBgColour: ['#f4ecdf'],
        tileBgColourHover: ['#d7d5d3'],
        tileBorderColour: ['#f4ecdf'],
        tileTextColour: ['#160d06'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Feminine',
        boardBgColour: '#f5f5f5',
        boardBorderColour: '#f5f5f5',
        boardBgColourTransition: '',
        tileBgColour: [
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
        ],
        tileBgColourHover: [
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
        ],
        tileBorderColour: [
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
        ],
        tileTextColour: [
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
        ],
        tileSpacing: 1.5,
        tileBorderRadius: 2,
      },
      {
        theming: 'Pink',
        boardBgColour: '#ffc4f0',
        boardBorderColour: '#ffc4f0',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff'],
        tileBgColourHover: ['#cccccc'],
        tileBorderColour: ['#7f5d83'],
        tileTextColour: ['#6e4994'],
        tileSpacing: 0,
        tileBorderRadius: 2,
      },
      {
        theming: 'Slimer',
        boardBgColour: '#8ec641',
        boardBorderColour: '#b5e37c',
        boardBgColourTransition: '',
        tileBgColour: ['#8fc444'],
        tileBgColourHover: ['#729d36'],
        tileBorderColour: ['#f8ffec'],
        tileTextColour: ['#fbfcf2'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Bright',
        boardBgColour: '#0b1b88',
        boardBorderColour: '#040f6d',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        tileBgColourHover: [
          '#cccccc',
          '#cccccc',
          '#cccccc',
          '#cccccc',
          '#cccccc',
        ],
        tileBorderColour: [
          '#7980ae',
          '#7980ae',
          '#7980ae',
          '#7980ae',
          '#7980ae',
        ],
        tileTextColour: ['#c7242c', '#dfa23e', '#8dbb5c', '#5687b0', '#a91e6b'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Beige',
        boardBgColour: '#f8edcd',
        boardBorderColour: '#f7eecd',
        boardBgColourTransition: '',
        tileBgColour: ['#f8edcf'],
        tileBgColourHover: ['#c6bea6'],
        tileBorderColour: ['#4d482a'],
        tileTextColour: ['#9e3826'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Villager',
        boardBgColour: '#ffffff',
        boardBorderColour: '#ffffff',
        boardBgColourTransition: '',
        tileBgColour: ['#c5f2da', '#ead8fe', '#f8c1bb', '#b7dcf7'],
        tileBgColourHover: ['#9ec2ae', '#bbadcb', '#c69a96', '#92b0c6'],
        tileBorderColour: [''],
        tileTextColour: ['#456d6a', '#746387', '#734b66', '#456284'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Insta',
        boardBgColour: '#1e3a4f',
        boardBorderColour: '#1e3a4f',
        boardBgColourTransition: '',
        tileBgColour: ['#1b3b4e'],
        tileBgColourHover: ['#d1d8dc'],
        tileBorderColour: ['#4f555a'],
        tileTextColour: ['#9aacb6'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'School',
        boardBgColour: '#eaf3fd',
        boardBorderColour: '#eaf8fe',
        boardBgColourTransition: '#e6f2f8',
        tileBgColour: ['#f6f5fb', '#f6f5fb', '#f6f5fb', '#f6f5fb'],
        tileBgColourHover: ['#c5c4c9', '#c5c4c9', '#c5c4c9', '#c5c4c9'],
        tileBorderColour: ['green', 'blue', 'yellow', 'red'],
        tileTextColour: ['black', 'black', 'black', 'black'],
        tileSpacing: 2,
        tileBorderRadius: 0,
      },
      {
        theming: 'Purplest',
        boardBgColour: '#c2b1fb',
        boardBorderColour: '#c2b1fb',
        boardBgColourTransition: '',
        tileBgColour: ['#c2b2fb', '#c2b2fb', '#c2b2fb', '#c2b2fb'],
        tileBgColourHover: ['#9b8ec9', '#9b8ec9', '#9b8ec9', '#9b8ec9'],
        tileBorderColour: ['#947ed0', '#947ed0', '#947ed0', '#947ed0'],
        tileTextColour: ['#9982df', '#9279d6', '#917bd2', '#907ad6'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
    ],
  },
};

const dark = {
  palette: {
    mode: 'dark',
    // boardBorder: 'solid 3px white',
    // boardBackgroundColor: 'white',
    themes: [
      {
        theming: 'Babyblue',
        boardBgColour: '#9bccea',
        boardBorderColour: '#9bccea',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff'],
        tileBgColourHover: ['#cccccc'],
        tileBorderColour: ['#dbeef4'],
        tileTextColour: ['#337a98'],
        tileSpacing: 0.5,
        tileBorderRadius: 0,
      },
      {
        theming: 'Vintage',
        boardBgColour: '#e6d6bd',
        boardBorderColour: '#221f17',
        boardBgColourTransition: '#d9d0bf',
        tileBgColour: ['#f4ecdf'],
        tileBgColourHover: ['#d7d5d3'],
        tileBorderColour: ['#f4ecdf'],
        tileTextColour: ['#160d06'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Feminine',
        boardBgColour: '#f5f5f5',
        boardBorderColour: '#f5f5f5',
        boardBgColourTransition: '',
        tileBgColour: [
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
        ],
        tileBgColourHover: [
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#ba9c95',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
          '#b6b2ae',
        ],
        tileBorderColour: [
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e8c3ba',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
          '#e4dfd9',
        ],
        tileTextColour: [
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
          '#0c0906',
        ],
        tileSpacing: 1.5,
        tileBorderRadius: 2,
      },
      {
        theming: 'Pink',
        boardBgColour: '#ffc4f0',
        boardBorderColour: '#ffc4f0',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff'],
        tileBgColourHover: ['#cccccc'],
        tileBorderColour: ['#7f5d83'],
        tileTextColour: ['#6e4994'],
        tileSpacing: 0,
        tileBorderRadius: 2,
      },
      {
        theming: 'Slimer',
        boardBgColour: '#8ec641',
        boardBorderColour: '#b5e37c',
        boardBgColourTransition: '',
        tileBgColour: ['#8fc444'],
        tileBgColourHover: ['#729d36'],
        tileBorderColour: ['#f8ffec'],
        tileTextColour: ['#fbfcf2'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Bright',
        boardBgColour: '#0b1b88',
        boardBorderColour: '#040f6d',
        boardBgColourTransition: '',
        tileBgColour: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        tileBgColourHover: [
          '#cccccc',
          '#cccccc',
          '#cccccc',
          '#cccccc',
          '#cccccc',
        ],
        tileBorderColour: [
          '#7980ae',
          '#7980ae',
          '#7980ae',
          '#7980ae',
          '#7980ae',
        ],
        tileTextColour: ['#c7242c', '#dfa23e', '#8dbb5c', '#5687b0', '#a91e6b'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Beige',
        boardBgColour: '#f8edcd',
        boardBorderColour: '#f7eecd',
        boardBgColourTransition: '',
        tileBgColour: ['#f8edcf'],
        tileBgColourHover: ['#c6bea6'],
        tileBorderColour: ['#4d482a'],
        tileTextColour: ['#9e3826'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Villager',
        boardBgColour: '#ffffff',
        boardBorderColour: '#ffffff',
        boardBgColourTransition: '',
        tileBgColour: ['#c5f2da', '#ead8fe', '#f8c1bb', '#b7dcf7'],
        tileBgColourHover: ['#9ec2ae', '#bbadcb', '#c69a96', '#92b0c6'],
        tileBorderColour: [''],
        tileTextColour: ['#456d6a', '#746387', '#734b66', '#456284'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'Insta',
        boardBgColour: '#1e3a4f',
        boardBorderColour: '#1e3a4f',
        boardBgColourTransition: '',
        tileBgColour: ['#1b3b4e'],
        tileBgColourHover: ['#d1d8dc'],
        tileBorderColour: ['#4f555a'],
        tileTextColour: ['#9aacb6'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
      {
        theming: 'School',
        boardBgColour: '#eaf3fd',
        boardBorderColour: '#eaf8fe',
        boardBgColourTransition: '#e6f2f8',
        tileBgColour: ['#f6f5fb', '#f6f5fb', '#f6f5fb', '#f6f5fb'],
        tileBgColourHover: ['#c5c4c9', '#c5c4c9', '#c5c4c9', '#c5c4c9'],
        tileBorderColour: ['green', 'blue', 'yellow', 'red'],
        tileTextColour: ['black', 'black', 'black', 'black'],
        tileSpacing: 2,
        tileBorderRadius: 0,
      },
      {
        theming: 'Purplest',
        boardBgColour: '#c2b1fb',
        boardBorderColour: '#c2b1fb',
        boardBgColourTransition: '',
        tileBgColour: ['#c2b2fb', '#c2b2fb', '#c2b2fb', '#c2b2fb'],
        tileBgColourHover: ['#9b8ec9', '#9b8ec9', '#9b8ec9', '#9b8ec9'],
        tileBorderColour: ['#947ed0', '#947ed0', '#947ed0', '#947ed0'],
        tileTextColour: ['#9982df', '#9279d6', '#917bd2', '#907ad6'],
        tileSpacing: 0,
        tileBorderRadius: 0,
      },
    ],
  },
};

// Need to check if the user is logged in with a silent check to the db
export async function refreshUserLoader() {
  const response = (await userService.refreshToken())
    ? await userService.refreshToken()
    : null;
  console.log('refreshUserAction response', response);
  return response;
}

// Need to check if the user is logged in with a silent check to the db
// export async function layoutLoader() {
//   const user = await userService.refreshToken();
//   console.log('layoutLoader user: ', user ? user : 'Nothing');
//   return { user };
// }

export default function Layout() {
  // Theme state set up
  // Light theme is default theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Getting device scheme settings to use as default for App
  useEffect(() => {
    // Update the default theme with device setting
    setIsDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    // Check to see if it changes at any point
    // console.log('isDarkTheme just changed');
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setIsDarkTheme(
          window.matchMedia('(prefers-color-scheme: dark)').matches
        );
      });
  }, [isDarkTheme]);

  // Toggling theme
  const changeTheme = () => {
    // console.log('change the theme');
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />

      <NavbarLayout checked={isDarkTheme} onChange={changeTheme} />
      <AlertComp />
      <Box
        aria-label="box-outline"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '8px',
          minHeight: '1650px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Outlet />

        <Box
          component="footer"
          sx={{
            py: 1,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
          }}
        >
          <Container maxWidth="sm">
            <Copyright sx={{ pt: 2 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
