import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import Board from './Board';
import Side from './Side';

export default function Play() {
  const [box, setBox] = useState(false);

  return (
    <Box height="100vh">
      <Grid container>
        <Grid item xs={2} sx={{ border: 1 }}>
          <Side box={box} />
        </Grid>
        <Grid item xs={10} sx={{ border: 1 }}>
          <Board setBox={setBox} />
        </Grid>
      </Grid>
    </Box>
  );
}
