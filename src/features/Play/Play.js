import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import Board from '../Boards/Board';
import BoardCreate from '../Boards/BoardCreate';
// import Side from './Side';
import { useLocation } from 'react-router-dom';
// import { userService } from '../users/user.service';

export default function Play() {
  let { state } = useLocation();
  console.log('Play state: ', state);

  const { boardId, compId, create } = state || {};
  const [box, setBox] = useState(false);

  // Create
  // 1) Check if there is an active board - I'll come back to this one
  // If not, save a new board to get the boardId
  // 2) Fetch random songs and artists
  // 3) Fetch fake artists
  // 4) Check fake artist is not actual artist
  // 5) Randomise artists
  // 6) Save tiles with boardId
  // 7) Save board with compId

  return (
    <Box height="100vh">
      <Grid container>
        {/*<Grid item xs={2} sx={{ border: 1 }}>
          <Side box={box} />
  </Grid>*/}

        <Grid item xs={12}>
          {create ? (
            <BoardCreate compId={compId} setBox={setBox} />
          ) : (
            <Board boardId={boardId} setBox={setBox} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
