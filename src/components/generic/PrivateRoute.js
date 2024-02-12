import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

import { userService } from '../../_services/user.service';

function PrivateRoute({ component: Component, roles, ...rest }) {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        const user = userService.userValue;
        if (!user) {
          // not logged in so redirect to login page with the return url
          return navigate('/user/signin', { replace: true });
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorized so redirect to home page
          return navigate('/', { replace: true });
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
