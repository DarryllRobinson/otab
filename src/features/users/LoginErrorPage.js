import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginErrorPage() {
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
      <Typography variant="h4" gutterBottom color="error">
        Login Error
      </Typography>
      <Typography variant="body1" gutterBottom>
        Something went wrong while trying to log you in. Please try again.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/signin')}
      >
        Go Back to Sign In
      </Button>
    </Box>
  );
}

export default LoginErrorPage;
