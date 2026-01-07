import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./providers/theme-provider";
import router from "./routes";
import ServiceWorkerProvider from "./providers/service-worker-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ServiceWorkerProvider>
        <RouterProvider router={router} />
      </ServiceWorkerProvider>
    </ThemeProvider>
  );
};

export default App;
