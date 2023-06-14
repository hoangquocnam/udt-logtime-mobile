import { createContext, useContext } from "react";
import { rootStore } from "../store";

const storeContext = createContext(rootStore);

export const useStores = () => {
  return useContext(storeContext);
};
