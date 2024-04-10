import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CompetitionList from './CompetitionList';
import { Competition } from './Competition';

export default function Competitions() {
  return (
    <Routes>
      <Route path="/" element={<CompetitionList />} />
      <Route path="/:id" element={<Competition />} />
    </Routes>
  );
}
