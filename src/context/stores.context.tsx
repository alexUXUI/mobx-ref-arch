import { createContext, ReactNode, useContext } from "react";
import { RootStore } from "../stores/root.store";

// create the context
const StoreContext = createContext<RootStore | undefined>(undefined);

type Children = { children: ReactNode };

// create the provider component
export function RootStoreProvider({ children }: Children) {
  //only create the store once (store is a singleton)
  const root = new RootStore();

  // make store available to all child nodes
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

// helper function to get the store in hook form
export function useStores() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
}
