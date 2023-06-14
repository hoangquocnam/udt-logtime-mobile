import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersistable } from "mobx-persist-store";

configurePersistable(
  {
    storage: AsyncStorage,
  },
  { delay: 200, fireImmediately: false }
);

export class RootStore {
  constructor() {}
}

export const rootStore = new RootStore();
