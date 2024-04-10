import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { boardService } from '../Boards/board.service';
import { userService } from '../users/user.service';

function Competition() {
  let { state } = useLocation();
  const { id, name } = state;
  const userId = userService.userValue.id;
  console.log({ userId });

  // Create params for board by comp id search
  const params = { compId: id, userId };

  const [status, setStatus] = useState('idle');
  // Fetch boards to see if user has already has a board for the competition
  const [boards, setBoards] = useState([]);

  const fetchBoards = useCallback(async () => {
    setStatus('fetching');
    const records = await boardService.getBoardByCompUserId(params);

    setStatus('succeeded');
    setBoards(records);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      fetchBoards();
    }
  }, [fetchBoards, status]);

  return (
    <div>
      {console.log('boards: ', boards)}
      <Button component={RouterLink} to="/competitions">
        Return to CompetitionList
      </Button>
      <div>Competition name: {name}</div>
      <div>Rules to follow</div>
      <Typography variant="h5" component="div">
        <RouterLink to="../../play">Click to join!</RouterLink>
      </Typography>
    </div>
  );
}

export { Competition };
