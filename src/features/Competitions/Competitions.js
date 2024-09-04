import React from 'react';
import { createBrowserRouter, Route, Routes } from 'react-router-dom';

import CompetitionList from './CompetitionList';
import { Competition } from './Competition';
import { competitionService } from './competition.service';
import CompetitionDetails, { competitionLoader } from './CompetitionDetails';

export async function competitionsLoader() {
  const competitions = await competitionService.getAll();
  console.log('competitionsLoader: ', competitions);
  return { competitions };
}

export default function Competitions() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CompetitionList />,
      loader: competitionsLoader,
    },
    {
      path: '/:competitionId',
      element: <CompetitionDetails />,
      loader: competitionLoader,
    },
  ]);
}
