import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface HeaderState {
  Action: ReactNode | null;
  setAction: Dispatch<SetStateAction<ReactNode | null>>;
}

const INITIAL_STATE: HeaderState = {
  Action: null,
  setAction: () => {},
};

export const HeaderContext = createContext<HeaderState>(INITIAL_STATE);

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === undefined)
    throw new Error("useHeader must be used within a HeaderProvider");

  return context;
};
