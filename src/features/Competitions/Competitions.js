import React from 'react';
import { Route, Routes } from 'react-router';
import { Box, Typography, useTheme } from '@mui/material';

import CompetitionList from './CompetitionList';
// import { Competition } from './Competition';
import { competitionService } from './competition.service';
import CompetitionDetails from './CompetitionDetails';

export async function competitionsLoader() {
  const competitions = await competitionService.getAll();
  return { competitions };
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
        <Route path="/:id" element={<CompetitionDetails />} />
      </Routes>
    </Box>
  );
}
