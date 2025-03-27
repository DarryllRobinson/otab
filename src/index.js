import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Layout, { layoutLoader } from "./components/generic/Layout";
import ErrorPage from "./components/navigation/ErrorPage";
import LandingPage from "./components/generic/LandingPage";
import SignIn, { loginAction } from "features/Users/SignIn";
import LoginErrorPage from "features/Users/LoginErrorPage";
import Dashboard from "features/Users/Dashboard";
import Competitions from "features/Competitions/Competitions";
import CompetitionDetails, {
  competitionDetailsLoader,
} from "features/Competitions/CompetitionDetails";
import CompetitionList from "features/Competitions/CompetitionList";
import { competitionsLoader } from "features/Competitions/CompetitionList";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: layoutLoader,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/signin",
          element: <SignIn />,
          errorElement: <LoginErrorPage />,
          action: loginAction,
        },
        { path: "/dashboard", element: <Dashboard /> },
        {
          path: "/competitions",
          element: <Competitions />,
          children: [
            {
              index: true,
              element: <CompetitionList />,
              loader: competitionsLoader,
            },
            {
              path: ":id",
              element: <CompetitionDetails />,
              loader: competitionDetailsLoader,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
