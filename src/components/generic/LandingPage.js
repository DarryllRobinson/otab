import React from "react";
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
import Copyright from "./Copyright";

export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 8,
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
        🎉 Radio Bingo 🎉
      </Typography>
      <Typography variant="h5" gutterBottom>
        Play Bingo Anytime, Anywhere!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          color="primary"
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              backgroundColor: "#ff5722",
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
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            borderColor: "white",
            color: "white",
            "&:hover": { borderColor: "#ff5722", color: "#ff5722" },
          }}
        >
          Login
        </Button>
        <Button
          component={RouterLink}
          to="/guest-play"
          variant="text"
          color="inherit"
          sx={{
            mx: 1,
            px: 4,
            py: 2,
            fontSize: "1.2rem",
            color: "white",
            "&:hover": { color: "#ff5722" },
          }}
        >
          Play as Guest
        </Button>
      </Box>

      {/* Game Preview & Features */}
      <Box sx={{ mt: 8, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Why Play Radio Bingo?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎮 Play for Free!
                </Typography>
                <Typography variant="body2">
                  Enjoy endless fun without spending a dime.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏆 Win Exciting Prizes!
                </Typography>
                <Typography variant="body2">
                  Compete with others and win amazing rewards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  👨‍👩‍👧‍👦 Play with Friends!
                </Typography>
                <Typography variant="body2">
                  Create custom rooms and enjoy bingo with your friends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Social Proof & Community */}
      <Box sx={{ mt: 8, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Join Our Community!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌟 Live Player Count
                </Typography>
                <Typography variant="body2">
                  Over 10,000 players online right now!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏅 Recent Winners
                </Typography>
                <Typography variant="body2">
                  See the latest winners and their prizes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💬 Testimonials
                </Typography>
                <Typography variant="body2">
                  "The best bingo game ever!" - Happy Player
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
            backgroundColor: "#ff5722",
            color: "white",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" },
            },
            "&:hover": {
              backgroundColor: "#e64a19",
            },
            mb: 2, // Add margin-bottom for spacing
          }}
        >
          Play Now
        </Button>
        <Button
          component={RouterLink}
          to="/signup"
          variant="outlined"
          color="secondary"
          sx={{ mx: 1 }}
        >
          Sign Up & Get 500 Free Coins!
        </Button>
      </Box>
    </Box>
  );
}
