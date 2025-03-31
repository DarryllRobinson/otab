import React from "react";
import { Box, Typography, Button, Grid, Paper, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

function Dashboard(props) {
  const theme = useTheme(); // Access the theme
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can manage your boards, view competitions, and explore more
        features.
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2, maxWidth: 600 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/boards")}
            aria-label="Navigate to My Boards"
          >
            My Boards
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/competitions")}
            aria-label="Navigate to Competitions"
          >
            Competitions
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/profile")}
            aria-label="View Profile"
          >
            View Profile
          </Button>
        </Grid>
      </Grid>
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 2,
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <Typography variant="body2">
          Boards Created: {props.boardsCreated || 0}
        </Typography>
        <Typography variant="body2">
          Competitions Participated: {props.competitionsParticipated || 0}
        </Typography>
        <Typography variant="body2">
          Songs Missed: {props.songsMissed || 0}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;
