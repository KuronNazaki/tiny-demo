import NavigationBar from "@pars/components/navigation-bar";
import RefreshingPull from "@pars/components/refreshing-pull";
import { useServiceWorker } from "@pars/providers/use-service-worker";
import { ScrollArea } from "@pars/shared/components/ui/scroll-area";
import { CloudAlert, CloudCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);

  useEffect(() => {
    const calculateHeight = () => {
      if (headerRef.current && scrollRef.current) {
        setScrollAreaHeight(
          window.innerHeight - headerRef.current.getBoundingClientRect().height
        );
      }
    };

    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  const { isReadyOffline } = useServiceWorker();

  return (
    <main className="flex flex-col items-center w-full h-dvh overflow-hidden">
      <RefreshingPull />
      <div
        ref={headerRef}
        className="p-5 shrink-0 w-full flex justify-between items-center"
      >
        <div>
          <h1 className="font-semibold text-2xl">Dashboard</h1>
          <span className="text-sm text-accent-foreground">
            Your subscription overview
          </span>
        </div>
        <div>{isReadyOffline ? <CloudCheck /> : <CloudAlert />}</div>
      </div>
      <ScrollArea style={{ height: `${scrollAreaHeight}px` }} ref={scrollRef}>
        <div className="flex flex-col items-center px-10 pt-5 pb-28">
          <Outlet />
        </div>
      </ScrollArea>
      <NavigationBar />
    </main>
  );
};

export default RootLayout;
