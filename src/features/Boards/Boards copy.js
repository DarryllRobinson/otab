import React from 'react';
import { Link as RouterLink, useLoaderData } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { boardService } from './board.service';

export async function boardLoader() {
  // const user = userService.userValue;
  // Hardcoding for now
  const user = 1;
  console.log('user: ', user);
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Boards() {
  const { boards } = useLoaderData();
  let content = boards.map((board) => (
    <Box key={board.id}>
      <Button
        key={board.id}
        component={RouterLink}
        to="/play"
        state={{
          boardId: board.id,
          compId: board.competitionId,
          create: false,
        }}
      >
        Competition ID: {board.competitionId}
      </Button>
    </Box>
  ));

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      Choose an existing board to capture songs
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {content}
      </Box>
    </Box>
  );
}
