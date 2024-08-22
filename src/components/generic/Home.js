import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Skeleton } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      Welcome to Radio Bingo!
      <Button component={RouterLink} to="/competitions">
        Competitions
      </Button>
      <Button component={RouterLink} to="/boards">
        My Boards
      </Button>
      <Skeleton variant="rectangular" width={210} height={118} />
    </Box>
  );
}
