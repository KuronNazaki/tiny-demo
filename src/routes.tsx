import RootLayout from "@pars/layouts/root-layout";
import { Navigate, createBrowserRouter } from "react-router-dom";

const LazyHome = import("./pages/home").then((module) => ({
  Component: module.default,
}));
const LazySubscriptions = import("./pages/subscriptions").then((module) => ({
  Component: module.default,
}));
const LazySettings = import("./pages/settings").then((module) => ({
  Component: module.default,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: () => LazyHome,
      },
      {
        path: "/subscriptions",
        lazy: () => LazySubscriptions,
      },
      {
        path: "/settings",
        lazy: () => LazySettings,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
