import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';

import { alertService, AlertType } from '../../_services';
import { Container } from '@mui/material';

export default function AlertComp({ id, fade }) {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      console.log('I was summoned for alert: ', alert);
      // Clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // Filter out alerts with 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        // Add alert to array
        setAlerts((alerts) => [...alerts, alert]);

        // Auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    // Clear alerts on location change
    const historyUnlisten = () => {
      // Don't clear if pathname has trailing slash because this will be auto redirected
      console.log('I am unlistening...');
      if (location.pathname.endsWith('/')) return;
      alertService.clear(id);
    };

    // Clean up function that runs when the component unmounts
    return () => {
      // Unsubscribe and listen to avoid memory leaks
      subscription.unsubscribe();
      historyUnlisten();
    };
  }, [location]);

  function removeAlert(alert) {
    if (fade) {
      // Fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );

      // Remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      // Remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    // const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'success',
      [AlertType.Error]: 'danger',
      [AlertType.Info]: 'info',
      [AlertType.Warning]: 'warning',
    };

    return alertTypeClass;

    // classes.push(alertTypeClass[alert.type]);

    // if (alert.fade) {
    //   classes.push('fade');
    // }

    // return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <Container>
      {console.log('Peekaboo! ')}
      {alerts.map((alert, index) => (
        <Alert key={index} severity={alert.type}>
          {alert.id}
        </Alert>
      ))}
    </Container>
  );
}

export { AlertComp };
