import { useHeader } from "@pars/providers/use-header";
import { useEffect } from "react";

const Subscriptions = () => {
  const { setAction } = useHeader();

  useEffect(() => setAction(null), [setAction]);
  
  return <div>Subscriptions Page works</div>;
};

export default Subscriptions;
