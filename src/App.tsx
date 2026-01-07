import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./providers/theme-provider";
import router from "./routes";
import ServiceWorkerProvider from "./providers/service-worker-provider";
import NavigationProvider from "./providers/navigation-provider";
import HeaderProvider from "./providers/header-provider";

const App = () => {
  return (
    <HeaderProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ServiceWorkerProvider>
          <NavigationProvider>
            <RouterProvider router={router} />
          </NavigationProvider>
        </ServiceWorkerProvider>
      </ThemeProvider>
    </HeaderProvider>
  );
};

export default App;
