import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout, { layoutLoader } from './components/generic/Layout';
import ErrorPage from './components/navigation/ErrorPage';
import LandingPage from './components/generic/LandingPage';
import SignIn, { loginAction } from 'features/Users/SignIn';
import LoginErrorPage from 'features/Users/LoginErrorPage';
import Dashboard from 'features/Users/Dashboard';
import Competitions, { competitionsLoader } from 'features/Competitions/Competitions';
// import { Competition, competitionLoader } from 'features/Competitions';
import CompetitionDetails, { competitionDetailsLoader } from 'features/Competitions/CompetitionDetails';


const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signin',
        element: <SignIn />,
        errorElement: <LoginErrorPage />,
        action: loginAction
      },
      {path: '/dashboard', element: <Dashboard />},
      {
        id: 'competitions',
        path: '/competitions/*',
        element: <Competitions />,
        loader: competitionsLoader,
        // children: [
        //   {
        //     path: 'competitions/:id',
        //     element: <CompetitionDetails />,
        //     loader: competitionDetailsLoader
        //   }
        // ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
