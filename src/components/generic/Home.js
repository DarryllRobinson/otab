import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        Welcome to Radio Bingo!
        <Button component={RouterLink} to="/user/signin">
          Sign In
        </Button>
        <Button component={RouterLink} to="/user/signup">
          Sign Up
        </Button>
        <Button component={RouterLink} to="/play">
          Play
        </Button>
      </Box>
    </>
  );
}
