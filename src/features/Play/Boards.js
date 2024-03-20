import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const boards = [
  {
    id: 1,
    name: 'Comp 1',
  },
  {
    id: 2,
    name: 'Comp 44',
  },
  {
    id: 5,
    name: 'Comp 78',
  },
];

export default function Boards() {
  // Display boards on the screen from the database query
  const renderBoards = boards.map((board) => {
    const { id, name } = board;

    return (
      <Button
        key={id}
        component={RouterLink}
        to="/play"
        state={{ boardId: id }}
      >
        {name}
      </Button>
    );
  });

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
      <div>{renderBoards}</div>
    </Box>
  );
}
