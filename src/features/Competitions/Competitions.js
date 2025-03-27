import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

import CompetitionList from './CompetitionList';
import CompetitionDetails from './CompetitionDetails';
import { competitionService } from './competition.service';

export async function competitionsLoader() {
  const competitions = await competitionService.getAll();
  return { competitions };
}

export async function competitionDetailsLoader({ params }) {
  const competition = await competitionService.getById(params.id);
  return { competition };
}

export default function Competitions() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 8,
        padding: 4,
        backgroundColor: theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Competitions
      </Typography>
      <Routes>
        <Route path="/" element={<CompetitionList />} />
        <Route
          path="/:id"
          element={<CompetitionDetails />}
          loader={competitionDetailsLoader}
        />
      </Routes>
    </Box>
  );
}
