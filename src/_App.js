import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

// Generic elements
import Layout from './components/generic/Layout';
import Home from './components/generic/Home';
import PrivateRoute from './components/generic/PrivateRoute';

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
import Board from './features/Play/Board';

// Define theme settings
const light = {
  palette: {
    mode: 'light',
    boardBorder: 'solid 3px brown',
    boardBackgroundColor: 'brown',
  },
};

const dark = {
  palette: {
    mode: 'dark',
    boardBorder: 'solid 3px brown',
    boardBackgroundColor: 'brown',
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
    <Container>
      <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/user" element={<User />} />

            <>
              <Route
                element={
                  <NavbarLayout checked={isDarkTheme} onChange={changeTheme} />
                }
              >
                <Routes>
                  <PrivateRoute exact path="/play" element={<Play />} />
                  <PrivateRoute exact path="/board" element={<Board />} />
                </Routes>

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
