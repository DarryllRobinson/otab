import React, { useEffect, useState, useMemo } from "react";
import { Outlet, useLoaderData } from "react-router";
import { Box, Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { light, dark } from "../../boardTheme"; // Import themes
import Copyright from "./Copyright";
import AlertComp from "./Alert";
import NavbarLayout from "../navigation/NavbarLayout";
import { userService } from "../../features/Users/user.service";
import { globalLight, globalDark } from "../../globalTheme"; // Import global themes

// Need to check if the user is logged in with a silent check to the db
export async function layoutLoader() {
  const user = await userService.refreshToken();
  // console.log('layoutLoader user: ', user ? user : 'Nothing');
  return { user };
}

export default function Layout() {
  // Access user from layoutLoader in route provider
  // const { user } = useLoaderData(); // Fix incorrect usage
  // console.log('Layout user: ', user ? user : 'Nothing');
  // Theme state set up
  // Light theme is default theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Memoize theme to avoid unnecessary re-creation
  const theme = useMemo(
    () => (isDarkTheme ? globalDark : globalLight),
    [isDarkTheme]
  );

  // Getting device scheme settings to use as default for App
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(mediaQuery.matches);

    const handleChange = (event) => setIsDarkTheme(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup event listener
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggling theme
  const changeTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    // <Container fixed>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        aria-label="box-outline"
        sx={{
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 4 }, // Responsive padding
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <NavbarLayout checked={isDarkTheme} onChange={changeTheme} />
        <AlertComp />
        <Outlet context={{ boardThemes: { light, dark } }} />{" "}
        {/* Pass board themes */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: { xs: 2, sm: 4 }, // Responsive padding
            mt: "auto",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Container maxWidth="sm">
            <Copyright sx={{ pt: 2 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    // </Container>
  );
}
