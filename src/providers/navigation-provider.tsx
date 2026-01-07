import { useState, type ReactNode } from "react";
import { NavigationContext } from "./use-navigation";

interface NavigationProviderProps {
  children: ReactNode;
}

const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [current, setCurrent] = useState(
    () => window.location.pathname.split("/")[1] || "dashboard"
  );

  return (
    <NavigationContext.Provider value={{ current, setCurrent }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
