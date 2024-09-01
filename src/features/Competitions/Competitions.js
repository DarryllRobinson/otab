import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CompetitionList from './CompetitionList';
import { Competition } from './Competition';
import { competitionService } from './competition.service';

export async function competitionsLoader() {
  const competitions = await competitionService.getAll();
  return { competitions };
}

export default function Competitions() {
  return (
    <Routes>
      <Route path="/" element={<CompetitionList />} />
      <Route path="/:id" element={<Competition />} />
    </Routes>
  );
}
