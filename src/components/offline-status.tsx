import { useServiceWorker } from "@pars/providers/use-service-worker";
import { CloudAlert, CloudCheck } from "lucide-react";

const OfflineStatus = () => {
  const { isReadyOffline } = useServiceWorker();

  return <div>{isReadyOffline ? <CloudCheck /> : <CloudAlert />}</div>;
};

export default OfflineStatus;
