import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout, { refreshUserLoader } from './components/generic/Layout';
import ErrorPage from './components/navigation/ErrorPage';
import Home from './components/generic/Home';
import SignIn, { loginAction } from './features/Users/SignIn';
import Boards, { boardsLoader } from './features/Boards/Boards';
import Board, { boardLoader } from './features/Boards/Board';
// import Play from './features/Play/Play';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    loader: refreshUserLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          { path: '/signin', element: <SignIn />, action: loginAction },
          {
            path: 'boards',
            element: <Boards />,
            loader: boardsLoader,
            children: [
              {
                path: 'board/:boardId',
                element: <Board />,
                loader: boardLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
