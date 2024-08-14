import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { boardService } from './board.service';
import { userService } from '../../features/users/user.service';

export default function Boards() {
  const [status, setStatus] = useState('idle');
  const user = userService.userValue;
  // console.log('user: ', user);
  // Display boards on the screen from the database query
  const [boards, setBoards] = useState([]);

  const fetchBoards = useCallback(async () => {
    setStatus('fetching');
    const records = await boardService.getAllByUserId(user.id);

    setStatus('succeeded');
    setBoards(records);
  }, [user.id]);

  useEffect(() => {
    if (status === 'idle') {
      fetchBoards();
    }
  }, [fetchBoards, status]);

  // const renderBoards = boards.map((board) => {
  //   // console.log(board);
  //   return (
  //     <Box sx={{ mt: 10 }}>
  //       <Button
  //         key={board.id}
  //         component={RouterLink}
  //         to="/play"
  //         state={{ boardId: board.id }}
  //       >
  //         Name: {board.name}
  //       </Button>
  //     </Box>
  //   );
  // });

  // const ddrenderBoards = () => {
  //   // console.log('going to render some boards: ', boards);
  //   boards.map((board) => {
  //     const { id, name } = board;

  //     return (
  //       <Box sx={{ mt: 10 }}>
  //         <Button
  //           key={id}
  //           component={RouterLink}
  //           to="/play"
  //           state={{ boardId: id }}
  //         >
  //           Name: {name}
  //         </Button>
  //       </Box>
  //     );
  //   });
  // };

  let content;

  if (status === 'fetching') {
    console.log('status: ', status);
    content = <div>Fetching</div>;
  } else if (status === 'error') {
    console.log('status: ', status);
    content = 'Error';
  } else if (status === 'succeeded' && boards.length > 0) {
    console.log('status: ', status);
    console.log('boards: ', boards);
    content = boards.map((board) => (
      <Box key={board.id}>
        <Button
          key={board.id}
          component={RouterLink}
          to="/play"
          state={{ boardId: board.id, compId: board.competitionId }}
        >
          Competition ID: {board.competitionId}
        </Button>
      </Box>
    ));
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
