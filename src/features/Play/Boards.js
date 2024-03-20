import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { alertService, boardService } from '../../_services';

// const boards = [
//   {
//     id: 1,
//     name: 'Comp 1',
//   },
//   {
//     id: 2,
//     name: 'Comp 44',
//   },
//   {
//     id: 5,
//     name: 'Comp 78',
//   },
// ];

export default function Boards() {
  const [status, setStatus] = useState('idle');
  // Display boards on the screen from the database query
  const [boards, setBoards] = useState(null);

  const fetchBoards = useCallback(async () => {
    setStatus('fetching');
    const records = await boardService.retrieveBoards();
    setStatus('fetching');
    console.log('fetched boards: ', boards);

    setStatus('succeeded');
    setBoards(records);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      console.log('Idling like a motherfucker');
      fetchBoards();
    }
  }, [fetchBoards, status]);

  // const renderBoards = boards.map((board) => {
  //   const { id, name } = board;

  //   return (
  //     <Button
  //       key={id}
  //       component={RouterLink}
  //       to="/play"
  //       state={{ boardId: id }}
  //     >
  //       {name}
  //     </Button>
  //   );
  // });

  let content;

  if (status === 'fetching') {
    console.log('status: ', status);
    content = <div>Fetching</div>;
  } else if (status === 'error') {
    console.log('status: ', status);
    content = 'Error';
  } else if (status === 'succeeded' && boards.length > 0) {
    console.log('status: ', status);
    // renderBoards();
  } else {
    console.log('status: ', status);
    content = 'No boards found';
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
