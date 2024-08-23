import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { competitionService } from './competition.service';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import CompetitionDetails from './CompetitionDetails';

export default function CompetitionList() {
  const [status, setStatus] = useState('idle');
  // Display competitions on the screen from the database query
  const [competitions, setCompetitions] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [numTiles, setNumTiles] = useState(0);

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

  const handleClick = (e) => {
    setId(e.id);
    setName(e.name);
    setNumTiles(e.numTiles);
  };

  const renderCompetitions = () => {
    return competitions.map((competition) => {
      console.log('competition: ', competition);
      const { id, name, numTiles } = competition;

      return (
        <Card key={id} sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={() => {
              handleClick({ id, name, numTiles });
            }}
          >
            {/* <RouterLink
              to="/competitions/competition"
              state={{ id: id, name: name, numTiles: numTiles }}
            > */}
            <CardActions>
              <CardContent>
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
              </CardContent>
            </CardActions>
            {/* </RouterLink> */}
          </CardActionArea>
        </Card>
      );
    });
  };

  let content;

  if (status === 'fetching') {
    // console.log('status: ', status);
    content = (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
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
      Choose an exciting competition to join!
      <Grid container spacing={2}>
        <Grid item>
          <Box>{content}</Box>
        </Grid>
        <Grid item>
          {id && (
            <Box>
              <CompetitionDetails id={id} name={name} numTiles={numTiles} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
