import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersistable } from "mobx-persist-store";
import AuthStore from "./authStore";

configurePersistable(
  {
    storage: AsyncStorage,
  },
  { delay: 200, fireImmediately: false }
);

export class RootStore {
  authStore: AuthStore;
  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export const rootStore = new RootStore();
