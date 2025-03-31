import React, { lazy, Suspense } from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
const Copyright = lazy(() => import("./Copyright"));

export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Hero Section */}
      <Typography variant="h2" gutterBottom>
        🎉 Welcome to OTAB 🎉
      </Typography>
      <Typography variant="h5" gutterBottom>
        Play, Compete, and Win!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          color="primary"
          aria-label="Sign up for OTAB"
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              transform: "scale(1.05)",
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Sign Up
        </Button>
        <Button
          component={RouterLink}
          to="/signin"
          variant="outlined"
          color="secondary"
          aria-label="Log in to OTAB"
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Login
        </Button>
      </Box>

      {/* Feature Highlights */}
      <Box sx={{ mt: 8, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Why Choose OTAB?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎮 Fun & Interactive
                </Typography>
                <Typography variant="body2">
                  Enjoy engaging gameplay with friends and family.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏆 Compete to Win
                </Typography>
                <Typography variant="body2">
                  Join competitions and win exciting prizes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌟 Custom Themes
                </Typography>
                <Typography variant="body2">
                  Personalize your experience with dynamic themes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Ready to Play?
        </Typography>
        <Button
          component={RouterLink}
          to="/boards"
          variant="contained"
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" },
            },
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          Play Now
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 8,
          py: 4,
          width: "100%",
          backgroundColor: "grey.200",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" gutterBottom>
          <RouterLink to="/rules" aria-label="Game Rules">
            Game Rules
          </RouterLink>{" "}
          |{" "}
          <RouterLink to="/faq" aria-label="Frequently Asked Questions">
            FAQ
          </RouterLink>{" "}
          |{" "}
          <RouterLink to="/support" aria-label="Support">
            Support
          </RouterLink>
        </Typography>
        <Typography variant="body2" gutterBottom>
          <RouterLink to="/privacy-policy" aria-label="Privacy Policy">
            Privacy Policy
          </RouterLink>{" "}
          |{" "}
          <RouterLink to="/terms-of-service" aria-label="Terms of Service">
            Terms of Service
          </RouterLink>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <img
              src="/path/to/facebook-icon.webp"
              alt="Facebook"
              style={{ width: 24, marginRight: 8 }}
              loading="lazy"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Twitter page"
          >
            <img
              src="/path/to/twitter-icon.webp"
              alt="Twitter"
              style={{ width: 24, marginRight: 8 }}
              loading="lazy"
            />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord server"
          >
            <img
              src="/path/to/discord-icon.webp"
              alt="Discord"
              style={{ width: 24 }}
              loading="lazy"
            />
          </a>
        </Box>
        <Suspense fallback={<div>Loading...</div>}>
          <Copyright />
        </Suspense>
      </Box>
    </Box>
  );
}
