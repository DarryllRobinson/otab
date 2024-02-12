import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { userService } from '../../_services';
import ErrorPage from '../navigation/ErrorPage';
import Play from '../../features/Play/Play';

const PrivateRoute = () => {
  // Authenticate
  const user = userService.userValue;

  return (
    <Routes>
      <Route path="/" element={<Play />} />
    </Routes>
  );
};

export default PrivateRoute;
