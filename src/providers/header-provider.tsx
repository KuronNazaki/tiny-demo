import { useState, type ReactNode } from "react";
import { HeaderContext } from "./use-header";

interface HeaderProviderProps {
  children: ReactNode;
}

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [Action, setAction] = useState<ReactNode | null>(null);

  return (
    <HeaderContext.Provider value={{ Action, setAction }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
