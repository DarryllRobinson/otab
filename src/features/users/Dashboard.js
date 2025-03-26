import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can manage your boards, view competitions, and explore more features.
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2, maxWidth: 600 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/boards')}
          >
            My Boards
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/competitions')}
          >
            Competitions
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate('/profile')}
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
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <Typography variant="body2">
          Boards Created: 5
        </Typography>
        <Typography variant="body2">
          Competitions Participated: 3
        </Typography>
        <Typography variant="body2">
          Songs Missed: 12
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;
