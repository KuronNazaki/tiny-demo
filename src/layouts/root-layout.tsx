import NavigationBar from "@pars/components/navigation-bar";
import RefreshingPull from "@pars/components/refreshing-pull";
import { useServiceWorker } from "@pars/providers/use-service-worker";
import { CloudAlert, CloudCheck } from "lucide-react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { isReadyOffline } = useServiceWorker();

  return (
    <main className="flex flex-col items-center w-full h-dvh overflow-hidden">
      <RefreshingPull />
      <div className="p-10 shrink-0 w-full flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl">Dashboard</h1>
          <span className="text-sm text-accent-foreground">Your subscription overview</span>
        </div>
        <div>{isReadyOffline ? <CloudCheck /> : <CloudAlert />}</div>
      </div>
      <div className="grow flex flex-col items-center overflow-y-scroll p-10">
        <Outlet />
      </div>
      <NavigationBar />
    </main>
  );
};

export default RootLayout;
