import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout, { layoutLoader } from './components/generic/Layout';
import ErrorPage from './components/navigation/ErrorPage';
import LandingPage from './components/generic/LandingPage';
import SignIn, { loginAction } from 'features/Users/SignIn';
import LoginErrorPage from 'features/Users/LoginErrorPage';


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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
