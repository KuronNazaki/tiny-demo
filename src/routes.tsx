import RootLayout from "@pars/layouts/root-layout";
import { Navigate, createBrowserRouter } from "react-router-dom";

const LazyHomePage = import("./pages/home").then((module) => ({
  Component: module.default,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: () => LazyHomePage,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
