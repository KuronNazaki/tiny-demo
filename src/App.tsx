import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@pars/shared/components/ui/alert-dialog";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { usePullToRefresh } from "use-pull-to-refresh";
import "./App.css";
import { ThemeProvider } from "./providers/theme-provider";
import { Button } from "./shared/components/ui/button";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;

const handleRefresh = () => {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};

function App() {
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: handleRefresh,
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  const [count] = useState(() =>
    Number.parseInt(localStorage.getItem("count") ?? "0")
  );

  const [offlineStatus, setOfflineStatus] = useState<string | null>(null);
  const [, setMessage] = useState<string | null>(null);
  const [newWorkerWaiting, setNewWorkerWaiting] = useState<string | null>(null);
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && registration.waiting) {
                console.log("New service worker installed and waiting.");
                setNewWorkerWaiting("A new version is available");
                setNewWorker(newWorker);
                setOpen(true);
              }
            });
          }
        });

        if (registration.active) {
          setOfflineStatus("Ready to be used offline");
          // setCurrentWorker(registration.active);
        }
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "SKIP_WAITING_ACK") {
          handleRefresh();
          return;
        }

        console.log("Message from service worker:", event.data);
        setMessage(event.data);
        toast.info(event.data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  const skip = () => {
    if (newWorker) {
      newWorker.postMessage({ type: "SKIP_WAITING", data: { key: "value" } });
    }
  };
  const postMessage = () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SKIP_WAITING",
        data: { key: "value" },
      });
    } else {
      console.error("Service worker controller not active or found.");
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="flex flex-col items-center w-full h-dvh overflow-hidden">
        <div
          style={{
            top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
            opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
          }}
          className="bg-rose-50 fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
        >
          <div
            className={`h-full w-full flex justify-center text-rose-600 items-center ${
              isRefreshing ? "animate-spin" : ""
            }`}
            style={
              !isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}
            }
          >
            <RotateCw />
          </div>
        </div>
        <div className="h-40 shrink-0 w-full flex flex-col justify-center items-center font-semibold text-center">
          <div>{offlineStatus || "No status"}</div>
          {/* <div>{message || "No message"}</div> */}
          <div>{newWorkerWaiting || "No worker"}</div>
          {/* {newWorkerWaiting === "A new version is available" && (
            <Button onClick={skip}>Update now</Button>
          )} */}
        </div>
        <div className="grow flex flex-col items-center overflow-y-scroll p-10">
          <h1 className="font-semibold">The Subscription</h1>
          <Button>Click me</Button>
          <Button onClick={postMessage}>Post Message to SW</Button>
        </div>
      </main>
      <Toaster position={"bottom-center"} />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              There is a new version available
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please update to ensure a seamless experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={skip}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ThemeProvider>
  );
}

export default App;
