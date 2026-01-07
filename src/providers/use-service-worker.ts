import { createContext, useContext } from "react";

type ServiceWorkerState = {
  isReadyOffline: boolean;
  hasNewWorker: boolean;
};

const INITIAL_STATE: ServiceWorkerState = {
  isReadyOffline: false,
  hasNewWorker: false,
};

export const ServiceWorkerContext =
  createContext<ServiceWorkerState>(INITIAL_STATE);

export const useServiceWorker = () => {
  const context = useContext(ServiceWorkerContext);

  if (context === undefined) {
    throw new Error(
      "useServiceWorker must be used within a ServiceWorkerProvider"
    );
  }
  return context;
};
