import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

import { competitionService } from './competition.service';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

export default function CompetitionList() {
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

  const renderCompetitions = () => {
    return competitions.map((competition) => {
      console.log('competition: ', competition);
      const { id, name, numTiles } = competition;

      return (
        <Card key={id} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <RouterLink
              to="/competitions/competition"
              state={{ id: id, name: name, numTiles: numTiles }}
            >
              <CardActions>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {name}
                  </Typography>
                </CardContent>
              </CardActions>
            </RouterLink>
          </CardActionArea>
        </Card>
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
  } else if (status === 'succeeded' && competitions.length > 0) {
    // console.log('status: ', status);
    content = renderCompetitions();
  } else {
    // console.log('status: ', status);
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
      Choose an existing competition to join
      <div>{content}</div>
      <Outlet />
    </Box>
  );
}
