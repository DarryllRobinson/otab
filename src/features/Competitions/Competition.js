import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { boardService } from '../Boards/board.service';
import { userService } from '../users/user.service';

function Competition() {
  let navigate = useNavigate();
  let { state } = useLocation();
  const { id, name } = state || {};
  console.log('competition: ', state);

  // Check if there is an id or userId, if not, navigate to CompetitionList
  if (name === undefined) navigate('../');

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

  const renderNew = () => {
    console.log('renderNew');
    return (
      <div>
        <div>Competition name: {name}</div>
        <div>Rules to follow</div>
        <Typography variant="h5" component="div">
          <RouterLink to="../../play" state={{ boardId: id }}>
            Click to join!
          </RouterLink>
        </Typography>
      </div>
    );
  };

  const renderReturn = () => {
    console.log('renderReturn');
    return (
      <div>
        <div>Competition name: {name}</div>
        <div>Rules to follow</div>
        <Typography variant="h5" component="div">
          <RouterLink to="../../play" state={{ boardId: id }}>
            Open your board
          </RouterLink>
        </Typography>
      </div>
    );
  };

  let content;

  if (status === 'fetching') {
    content = <div>Fetching</div>;
  } else if (status === 'error') {
    content = 'Error';
  } else if (status === 'succeeded' && boards.length > 0) {
    content = renderReturn();
  } else if (status === 'succeeded' && boards.length > 0) {
    content = renderNew();
  } else {
    content = (
      <div>Competition not found. Please return to the competition list</div>
    );
  }

  return (
    <div>
      {console.log('boards: ', boards)}
      <Button component={RouterLink} to="/competitions">
        Return to CompetitionList
      </Button>
      {content}
    </div>
  );
}

export { Competition };
