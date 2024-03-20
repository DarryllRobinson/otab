import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import Board from './Board';
import Side from './Side';
import { useLocation } from 'react-router-dom';

export default function Play() {
  let { state } = useLocation();
  const { boardId } = state;
  console.log('boardId: ', boardId);
  const [box, setBox] = useState(false);

  return (
    <Box height="100vh">
      <Grid container>
        <Grid item xs={2} sx={{ border: 1 }}>
          <Side box={box} />
        </Grid>
        <Grid item xs={10} sx={{ border: 1 }}>
          <Board boardId={boardId} setBox={setBox} />
        </Grid>
      </Grid>
    </Box>
  );
}
