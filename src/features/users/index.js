import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import RequireAuth from '../../components/generic/RequireAuth';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { VerifyEmail } from './VerifyEmail';

const UserComp = () => {
  return <div>UserComp</div>;
};

function User() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <UserComp />
          </RequireAuth>
        }
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}

export { User };
