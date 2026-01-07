import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type NavigationState = {
  current: string;
  setCurrent: Dispatch<SetStateAction<string>>;
};

const INITIAL_STATE: NavigationState = {
  current: "dashboard",
  setCurrent: () => {},
};

export const NavigationContext = createContext<NavigationState>(INITIAL_STATE);

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (context === undefined)
    throw new Error("useNavigation must be used within a NavigationProvider");

  return context;
};
