import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useRouteLoaderData } from 'react-router-dom';

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
  const { competitions } = useRouteLoaderData('competitions');
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [numTiles, setNumTiles] = useState(0);

  const handleClick = (e) => {
    setId(e.id);
    setName(e.name);
    setNumTiles(e.numTiles);
  };

  const renderCompetitions = () => {
    return competitions?.map((competition) => {
      console.log('competition: ', competition);
      const { id, name, numTiles } = competition;

      return (
        <Card key={id} sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={() => {
              handleClick({ id, name, numTiles });
            }}
          >
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

  // let content;

  // content = renderCompetitions();

  return (
    <Box
      sx={{
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'green',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          Choose an exciting competition to join!
          <Box>{renderCompetitions()}</Box>
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
