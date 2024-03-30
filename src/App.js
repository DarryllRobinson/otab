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
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#dbeef4',
        tileTextColour: '#337a98',
        boardBgColour: '#9bccea',
        boardBgColourTransition: '',
        boardBorderColour: '#9bccea',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
        tileSpacing: 0.5,
      },
      {
        theming: 'Vintage',
        tileBgColour: '#f4ecdf',
        tileBgColourHover: '#d7d5d3',
        tileBorderColour: '',
        tileTextColour: '#160d06',
        boardBgColour: '#e6d6bd',
        boardBgColourTransition: '#d9d0bf',
        boardBorderColour: '#221f17',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Feminine',
        tileBgColour: '#e8c3ba',
        tileBgColourHover: '#ba9c95',
        tileBorderColour: '',
        tileTextColour: '#0c0906',
        boardBgColour: '#f5f5f5',
        boardBgColourTransition: '',
        boardBorderColour: '#f5f5f5',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '#e4dfd9',
        tileBgColourHover2: '#b6b2ae',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
        tileSpacing: 1.5,
      },
      {
        theming: 'Pink',
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#7f5d83',
        tileTextColour: '#6e4994',
        boardBgColour: '#ffc4f0',
        boardBgColourTransition: '',
        boardBorderColour: '#ffc4f0',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Slimer',
        tileBgColour: '#8fc444',
        tileBgColourHover: '#729d36',
        tileBorderColour: '#f8ffec',
        tileTextColour: '#fbfcf2',
        boardBgColour: '#8ec641',
        boardBgColourTransition: '',
        boardBorderColour: '#b5e37c',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Bright',
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#7980ae',
        tileTextColour: '#c7242c',
        boardBgColour: '#0b1b88',
        boardBgColourTransition: '',
        boardBorderColour: '#040f6d',
        tileTextColour2: '#dfa23e',
        tileTextColour3: '#8dbb5c',
        tileTextColour4: '#5687b0',
        tileTextColour5: '#a91e6b',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Beige',
        tileBgColour: '#f8edcf',
        tileBgColourHover: '#c6bea6',
        tileBorderColour: '#4d482a',
        tileTextColour: '#9e3826',
        boardBgColour: '#f8edcd',
        boardBgColourTransition: '',
        boardBorderColour: '#f7eecd',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Villager',
        tileBgColour: '#c5f2da',
        tileBgColourHover: '#9ec2ae',
        tileBorderColour: '',
        tileTextColour: '#456d6a',
        boardBgColour: '#ffffff',
        boardBgColourTransition: '',
        boardBorderColour: '#ffffff',
        tileTextColour2: '#746387',
        tileTextColour3: '#734b66',
        tileTextColour4: '#456284',
        tileTextColour5: '',
        tileBgColour2: '#ead8fe',
        tileBgColourHover2: '#bbadcb',
        tileBgColour3: '#f8c1bb',
        tileBgColourHover3: '#c69a96',
        tileBgColour4: '#b7dcf7',
        tileBgColourHover4: '#92b0c6',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Insta',
        tileBgColour: '#1b3b4e',
        tileBgColourHover: '#d1d8dc',
        tileBorderColour: '#4f555a',
        tileTextColour: '#9aacb6',
        boardBgColour: '#1e3a4f',
        boardBgColourTransition: '',
        boardBorderColour: '#1e3a4f',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'School',
        tileBgColour: '#ebfbfe',
        tileBgColourHover: '#bcc9cb',
        tileBorderColour: '#8eb1a5',
        tileTextColour: '#59676c',
        boardBgColour: '#eaf3fd',
        boardBgColourTransition: '#e6f2f8',
        boardBorderColour: '#eaf8fe',
        tileTextColour2: '#2f3c42',
        tileTextColour3: '#42545d',
        tileTextColour4: '#7a8283',
        tileTextColour5: '#5c6668',
        tileBgColour2: '#f6f5fb',
        tileBgColourHover2: '#c5c4c9',
        tileBgColour3: '#f0f6f9',
        tileBgColourHover3: '#c0c5c7',
        tileBgColour4: '#eef8fb',
        tileBgColourHover4: '#bec6c9',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Purplest',
        tileBgColour: '#c2b2fb',
        tileBgColourHover: '#9b8ec9',
        tileBorderColour: '#947ed0',
        tileTextColour: '#9982df',
        boardBgColour: '#c2b1fb',
        boardBgColourTransition: '',
        boardBorderColour: '#c2b1fb',
        tileTextColour2: '#9279d6',
        tileTextColour3: '#917bd2',
        tileTextColour4: '#907ad6',
        tileTextColour5: '',
        tileBgColour2: '#c3b1fb',
        tileBgColourHover2: '#9c8ec9',
        tileBgColour3: '#c3b1fb',
        tileBgColourHover3: '#9c8ec9',
        tileBgColour4: '#c3b1fb',
        tileBgColourHover4: '#9c8ec9',
        tileBgColour5: '',
        tileBgColourHover5: '',
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
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#dbeef4',
        tileTextColour: '#337a98',
        boardBgColour: '#9bccea',
        boardBgColourTransition: '',
        boardBorderColour: '#9bccea',
        spacing: 0,
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
        tileBorderRadius: 0,
        tileSpacing: 0.5,
      },
      {
        theming: 'Vintage',
        tileBgColour: '#f4ecdf',
        tileBgColourHover: '#d7d5d3',
        tileBorderColour: '',
        tileTextColour: '#160d06',
        boardBgColour: '#e6d6bd',
        boardBgColourTransition: '#d9d0bf',
        boardBorderColour: '#221f17',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Feminine',
        tileBgColour: '#e8c3ba',
        tileBgColourHover: '#ba9c95',
        tileBorderColour: '',
        tileTextColour: '#0c0906',
        boardBgColour: '#f5f5f5',
        boardBgColourTransition: '',
        boardBorderColour: '#f5f5f5',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '#e4dfd9',
        tileBgColourHover2: '#b6b2ae',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
        tileSpacing: 1.5,
      },
      {
        theming: 'Pink',
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#7f5d83',
        tileTextColour: '#6e4994',
        boardBgColour: '#ffc4f0',
        boardBgColourTransition: '',
        boardBorderColour: '#ffc4f0',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Slimer',
        tileBgColour: '#8fc444',
        tileBgColourHover: '#729d36',
        tileBorderColour: '#f8ffec',
        tileTextColour: '#fbfcf2',
        boardBgColour: '#8ec641',
        boardBgColourTransition: '',
        boardBorderColour: '#b5e37c',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Bright',
        tileBgColour: '#ffffff',
        tileBgColourHover: '#cccccc',
        tileBorderColour: '#7980ae',
        tileTextColour: '#c7242c',
        boardBgColour: '#0b1b88',
        boardBgColourTransition: '',
        boardBorderColour: '#040f6d',
        tileTextColour2: '#dfa23e',
        tileTextColour3: '#8dbb5c',
        tileTextColour4: '#5687b0',
        tileTextColour5: '#a91e6b',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Beige',
        tileBgColour: '#f8edcf',
        tileBgColourHover: '#c6bea6',
        tileBorderColour: '#4d482a',
        tileTextColour: '#9e3826',
        boardBgColour: '#f8edcd',
        boardBgColourTransition: '',
        boardBorderColour: '#f7eecd',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Villager',
        tileBgColour: '#c5f2da',
        tileBgColourHover: '#9ec2ae',
        tileBorderColour: '',
        tileTextColour: '#456d6a',
        boardBgColour: '#ffffff',
        boardBgColourTransition: '',
        boardBorderColour: '#ffffff',
        tileTextColour2: '#746387',
        tileTextColour3: '#734b66',
        tileTextColour4: '#456284',
        tileTextColour5: '',
        tileBgColour2: '#ead8fe',
        tileBgColourHover2: '#bbadcb',
        tileBgColour3: '#f8c1bb',
        tileBgColourHover3: '#c69a96',
        tileBgColour4: '#b7dcf7',
        tileBgColourHover4: '#92b0c6',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Insta',
        tileBgColour: '#1b3b4e',
        tileBgColourHover: '#d1d8dc',
        tileBorderColour: '#4f555a',
        tileTextColour: '#9aacb6',
        boardBgColour: '#1e3a4f',
        boardBgColourTransition: '',
        boardBorderColour: '#1e3a4f',
        tileTextColour2: '',
        tileTextColour3: '',
        tileTextColour4: '',
        tileTextColour5: '',
        tileBgColour2: '',
        tileBgColourHover2: '',
        tileBgColour3: '',
        tileBgColourHover3: '',
        tileBgColour4: '',
        tileBgColourHover4: '',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'School',
        tileBgColour: '#ebfbfe',
        tileBgColourHover: '#bcc9cb',
        tileBorderColour: '#8eb1a5',
        tileTextColour: '#59676c',
        boardBgColour: '#eaf3fd',
        boardBgColourTransition: '#e6f2f8',
        boardBorderColour: '#eaf8fe',
        tileTextColour2: '#2f3c42',
        tileTextColour3: '#42545d',
        tileTextColour4: '#7a8283',
        tileTextColour5: '#5c6668',
        tileBgColour2: '#f6f5fb',
        tileBgColourHover2: '#c5c4c9',
        tileBgColour3: '#f0f6f9',
        tileBgColourHover3: '#c0c5c7',
        tileBgColour4: '#eef8fb',
        tileBgColourHover4: '#bec6c9',
        tileBgColour5: '',
        tileBgColourHover5: '',
      },
      {
        theming: 'Purplest',
        tileBgColour: '#c2b2fb',
        tileBgColourHover: '#9b8ec9',
        tileBorderColour: '#947ed0',
        tileTextColour: '#9982df',
        boardBgColour: '#c2b1fb',
        boardBgColourTransition: '',
        boardBorderColour: '#c2b1fb',
        tileTextColour2: '#9279d6',
        tileTextColour3: '#917bd2',
        tileTextColour4: '#907ad6',
        tileTextColour5: '',
        tileBgColour2: '#c3b1fb',
        tileBgColourHover2: '#9c8ec9',
        tileBgColour3: '#c3b1fb',
        tileBgColourHover3: '#9c8ec9',
        tileBgColour4: '#c3b1fb',
        tileBgColourHover4: '#9c8ec9',
        tileBgColour5: '',
        tileBgColourHover5: '',
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
                />

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
