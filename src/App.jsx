import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Cast = lazy(() => import("./components/Cast"));
const Reviews = lazy(() => import("./components/Reviews"));
const SharedLayout = lazy(() => import("./components/SharedLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      {
        path: "movies/:movieId",
        element: <MovieDetails />,
        children: [
          { path: "cast", element: <Cast /> },
          { path: "reviews", element: <Reviews /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
