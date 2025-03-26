import React, { useCallback, useEffect, useState } from 'react';
import {
  Link as RouterLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { boardService } from '../Boards/board.service';
// import { boardService } from '../Boards/board.service';
import { userService } from '../../../src/features/Users/user.service';

export async function competitionBoardLoader({ params }) {
  const board = await boardService.getBoardByCompUserId(params);
  return { board };
}

function Competition() {
  const { board } = useLoaderData();
  const { id, name } = board;

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

  return (
    <div>
      {/* {console.log('boards: ', boards)} */}
      <Button component={RouterLink} to="/competitions">
        Return to CompetitionList
      </Button>
      {renderNew()}
    </div>
  );
}

export { Competition };
