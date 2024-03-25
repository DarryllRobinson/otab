import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { boardService } from './board.service';

export default function Boards() {
  const [status, setStatus] = useState('idle');
  // Display boards on the screen from the database query
  const [boards, setBoards] = useState([]);

  const fetchBoards = useCallback(async () => {
    setStatus('fetching');
    const records = await boardService.getAll();

    setStatus('succeeded');
    setBoards(records);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      fetchBoards();
    }
  }, [fetchBoards, status]);

  const renderBoards = () => {
    boards.map((board) => {
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
  };

  let content;

  if (status === 'fetching') {
    // console.log('status: ', status);
    content = <div>Fetching</div>;
  } else if (status === 'error') {
    // console.log('status: ', status);
    content = 'Error';
  } else if (status === 'succeeded' && boards.length > 0) {
    // console.log('status: ', status);
    renderBoards();
  } else {
    // console.log('status: ', status);
    content = <div>No boards found. Please join one of our competitions</div>;
  }

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
      <div>{content}</div>
    </Box>
  );
}
