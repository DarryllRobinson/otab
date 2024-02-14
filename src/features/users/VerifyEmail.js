import React, { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { userService, alertService } from '../../_services';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const EmailStatus = {
    Verifying: 'Verifying',
    Failed: 'Failed',
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(location.pathname);

    userService
      .verifyEmail(searchParams.get('token'))
      .then(() => {
        alertService.success('Verification successful, you can now login', {
          keepAfterRouteChange: true,
        });
        console.log('verified!');
        navigate('/user/signin');
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{' '}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      default:
        return <div>Default emailStatus - something has gone wrong</div>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Verify Email</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
}

export { VerifyEmail };
