import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./providers/theme-provider";
import router from "./routes";
import ServiceWorkerProvider from "./providers/service-worker-provider";
import NavigationProvider from "./providers/navigation-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ServiceWorkerProvider>
        <NavigationProvider>
          <RouterProvider router={router} />
        </NavigationProvider>
      </ServiceWorkerProvider>
    </ThemeProvider>
  );
};

export default App;
