import OfflineStatus from "@pars/components/offline-status";
import { useHeader } from "@pars/providers/use-header";
import { useEffect } from "react";

const Settings = () => {
  const { setAction } = useHeader();

  useEffect(() => setAction(<OfflineStatus />), [setAction]);

  return <div>Settings Page works</div>;
};

export default Settings;
