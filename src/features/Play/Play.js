import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import Board from '../Boards/Board';
import Side from './Side';
import { useLocation } from 'react-router-dom';
import { userService } from '../users/user.service';

export default function Play() {
  let { state } = useLocation();

  const { boardId } = state || {};
  console.log('Board boardId: ', boardId);
  const user = userService.userValue;
  console.log('user: ', user);
  const [box, setBox] = useState(false);

  return (
    <Box height="100vh">
      <Grid container>
        {/*<Grid item xs={2} sx={{ border: 1 }}>
          <Side box={box} />
  </Grid>*/}
        <Grid item xs={12}>
          <Board boardId={boardId} setBox={setBox} />
        </Grid>
      </Grid>
    </Box>
  );
}
