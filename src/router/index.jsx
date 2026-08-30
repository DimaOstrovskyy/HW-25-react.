import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Loader from "../components/Loader";

const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailPage = lazy(() => import("../pages/MovieDetailPage"));
const Cast = lazy(() => import("../pages/Cast/Cast"));
const Reviews = lazy(() => import("../pages/Reviews/Reviews"));

const lazyElement = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: lazyElement(HomePage) },
      { path: "movies", element: lazyElement(MoviesPage) },
      {
        path: "movies/:movieId",
        element: lazyElement(MovieDetailPage),
        children: [
          { path: "cast", element: lazyElement(Cast) },
          { path: "reviews", element: lazyElement(Reviews) },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
