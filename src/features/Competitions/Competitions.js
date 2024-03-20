import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { competitionService } from './competition.service';

// const competitions = [
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

export default function Competitions() {
  const [status, setStatus] = useState('idle');
  // Display competitions on the screen from the database query
  const [competitions, setCompetitions] = useState([]);

  const fetchCompetitions = useCallback(async () => {
    setStatus('fetching');
    const records = await competitionService.getAll();

    setStatus('succeeded');
    setCompetitions(records);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      fetchCompetitions();
    }
  }, [fetchCompetitions, status]);

  const renderCompetitions = competitions.map((competition) => {
    console.log('competition: ', competition);
    const { id, name } = competition;

    return (
      <Button
        key={id}
        component={RouterLink}
        to="/play"
        state={{ competitionId: id }}
      >
        {name}
      </Button>
    );
  });

  let content;

  if (status === 'fetching') {
    console.log('status: ', status);
    content = <div>Fetching</div>;
  } else if (status === 'error') {
    console.log('status: ', status);
    content = 'Error';
  } else if (status === 'succeeded' && competitions.length > 0) {
    console.log('status: ', status);
    renderCompetitions();
  } else {
    console.log('status: ', status);
    content = (
      <div>No competitions found. Please join one of our competitions</div>
    );
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
      Choose an existing competition to capture songs
      <div>{content}</div>
    </Box>
  );
}
