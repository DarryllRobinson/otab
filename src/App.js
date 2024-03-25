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
import { Box } from '@mui/material';
// import Board from './features/Play/Board';

// Define theme settings
const light = {
  palette: {
    mode: 'light',
    boardBorder: 'solid 3px #192024',
    boardBackgroundColor: '#192024',
    themes: [
      {
        theming: 'babyblue',
        tileBgColour: 'red',
        tileBgColourHover: 'red',
      },
      { theming: 'kak', tileBgColour: 'yellow', tileBgColourHover: 'yellow' },
    ],
  },
};

const dark = {
  palette: {
    mode: 'dark',
    boardBorder: 'solid 3px white',
    boardBackgroundColor: 'white',
    themes: [
      {
        theming: 'babyblue',
        tileBgColour: '#6dbff2',
        tileBgColourHover: '#89cffa',
      },
      { theming: 'kak', tileBgColour: 'brown', tileBgColourHover: 'brown' },
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
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="user/*" element={<User />} />

              <>
                <Route
                  element={
                    <NavbarLayout
                      checked={isDarkTheme}
                      onChange={changeTheme}
                    />
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
        </Box>
      </ThemeProvider>
    </Container>
  );
}
