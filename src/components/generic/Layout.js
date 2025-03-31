import React, { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { light, dark } from "../../theme"; // Import updated themes
import NavbarLayout from "../navigation/NavbarLayout";
import { userService } from "../../features/Users/user.service";
import ErrorBoundary from "./ErrorBoundary"; // Import ErrorBoundary

export async function layoutLoader() {
  const user = await userService.refreshToken();
  return { user };
}

export default function Layout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = useMemo(() => (isDarkTheme ? dark : light), [isDarkTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(mediaQuery.matches);

    const handleChange = (event) => setIsDarkTheme(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const changeTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <NavbarLayout checked={isDarkTheme} onChange={changeTheme} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
            <Outlet />
          </Container>
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Over The Air Engagement. All
                    rights reserved.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ textAlign: { xs: "center", sm: "right" } }}
                >
                  <Link
                    href="/terms"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                  >
                    Terms
                  </Link>
                  <Link
                    href="/privacy"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/contact"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                  >
                    Contact
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
