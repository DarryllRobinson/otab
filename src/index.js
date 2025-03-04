import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout, { layoutLoader } from './components/generic/Layout';
import ErrorPage from './components/navigation/ErrorPage';
import Home from './components/generic/Home';
import SignIn, { loginAction } from './features/Users/SignIn';
import LoginErrorPage from './features/Users/LoginErrorPage';
import Boards, { boardLoader } from 'Boards';
// import Boards, { boardLoader } from './features/Boards/Boards';
import Competitions, {
  competitionsLoader,
} from './features/Competitions/Competitions';
import {
  Competition,
  competitionBoardLoader,
} from './features/Competitions/Competition';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SignIn />,
        errorElement: <LoginErrorPage />,
        action: loginAction,
      },
      { path: '/boards', element: <Boards />, loader: boardLoader },
      {
        id: 'competitions',
        path: '/competitions/*',
        element: <Competitions />,
        loader: competitionsLoader,
        children: [
          {
            path: 'competitons/competition',
            element: <Competition />,
            loader: competitionBoardLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
