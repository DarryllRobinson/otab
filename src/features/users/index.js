import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { userService } from '../../_services';

import { VerifyEmail } from './VerifyEmail';

function User({ match }) {
  const { path } = match;
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path={`${path}/verify-email`} component={VerifyEmail} />
    </Routes>
  );
}

export { User };
