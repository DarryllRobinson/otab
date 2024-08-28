import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import ErrorPage from './components/navigation/ErrorPage';
import { boardService } from './features/Boards/board.service';
import { userService } from './features/users/user.service';

export async function loader() {
  const user = userService.userValue;
  console.log('user: ', user);
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Root() {
  return (
    <Routes>
      {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
}
