import React, { useCallback, useEffect, useState } from 'react';
import {
  Link as RouterLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { competitionService } from './competition.service';


// export async function competitionLoader({ params }) {
//   console.log('competitionLoader', params);
//   const competition = await competitionService.getById(params.id);
//   return { competition };
// }

// export async function competitionBoardLoader({ params }) {
//   const board = await boardService.getBoardByCompUserId(params);
//   return { board };
// }

function Competition(props) {
  console.log('Competition', props);
  // const { competition } = useLoaderData();
  // console.log('competition: ', competition);
  // const { id, name } = competition;

  const renderNew = () => {
    console.log('renderNew');
    return (
      <div>
        {/* <div>Competition name: {name}</div> */}
        <div>Rules to follow</div>
        <Typography variant="h5" component="div">
          {/* <RouterLink to="../../play" state={{ boardId: id }}>
            Click to join!
          </RouterLink> */}
        </Typography>
      </div>
    );
  };

  // const renderReturn = () => {
  //   console.log('renderReturn');
  //   return (
  //     <div>
  //       <div>Competition name: {name}</div>
  //       <div>Rules to follow</div>
  //       <Typography variant="h5" component="div">
  //         <RouterLink to="../../play" state={{ boardId: id }}>
  //           Open your board
  //         </RouterLink>
  //       </Typography>
  //     </div>
  //   );
  // };

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
