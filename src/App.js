import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

// Generic elements
import Layout from './components/generic/Layout';
import Home from './components/generic/Home';
// import PrivateRoute from './components/generic/PrivateRoute';
import RequireAuth from './components/generic/RequireAuth';

// Navigation elements
import NavbarLayout from './components/navigation/NavbarLayout';
import ErrorPage from './components/navigation/ErrorPage';

// Features
// Users
import { User } from './features/users';
// import SignUp from './features/users/SignUp';
// import { VerifyEmail } from './features/users/VerifyEmail';

// Play
import Play from './features/Play/Play';
import Boards from './features/Boards/Boards';
import Competitions from './features/Competitions/Competitions';
// import { Box } from '@mui/material';
// Test board for figuring out the formatting
import Test from './features/Boards/Test';
// import Board from './features/Play/Board';

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

export default function App() {
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
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Container fixed>
      <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user/*" element={<User />} />

            <>
              <Route
                element={
                  <NavbarLayout checked={isDarkTheme} onChange={changeTheme} />
                }
              >
                <Route
                  path="/play/*"
                  element={
                    <RequireAuth>
                      <Play />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/boards/*"
                  element={
                    <RequireAuth>
                      <Boards />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/test"
                  element={
                    <RequireAuth>
                      <Test />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/competitions/*"
                  element={
                    <RequireAuth>
                      <Competitions />
                    </RequireAuth>
                  }
                ></Route>

                {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </>
          </Route>
        </Routes>
      </ThemeProvider>
    </Container>
  );
}
