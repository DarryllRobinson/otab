import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { VerifyEmail } from './VerifyEmail';

function User() {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}

export { User };
