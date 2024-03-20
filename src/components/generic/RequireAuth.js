import { Navigate } from 'react-router-dom';
import { userService } from '../../_services';

function RequireAuth({ children }) {
  //let location = useLocation;
  const user = userService.userValue;
  // console.log('user: ', user);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <Navigate to="user/signin" state={{ from: location }} replace />;

    return <Navigate to="/user/signin" replace />;
  }

  return children;
}

export default RequireAuth;
