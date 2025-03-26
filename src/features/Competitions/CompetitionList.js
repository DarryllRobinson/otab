import React, { useState } from 'react';
import { Link as RouterLink, useRouteLoaderData } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import CompetitionDetails from './CompetitionDetails';

export default function CompetitionList() {
  const { competitions } = useRouteLoaderData('competitions');
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const handleClick = (competition) => {
    setSelectedCompetition(competition);
  };

  const renderCompetitions = () => {
    return competitions?.map((competition) => {
      const { id, name, numTiles } = competition;

      return (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[700],
              boxShadow: 3,
              '&:hover': { boxShadow: 6 },
            }}
          >
            <CardActionArea
              onClick={() => handleClick({ id, name, numTiles })}
              sx={{ padding: 2 }}
            >
              <RouterLink
                to="/competitions/competition"
                state={{ id, name, numTiles }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {name}
                  </Typography>
                </CardContent>
              </RouterLink>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Choose an exciting competition to join!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {renderCompetitions()}
      </Grid>
      {selectedCompetition && (
        <Box sx={{ marginTop: 4, width: '100%' }}>
          <CompetitionDetails {...selectedCompetition} />
        </Box>
      )}
    </Box>
  );
}
