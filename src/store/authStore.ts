import { makeAutoObservable } from "mobx";
import { IUserRefreshToken, IUserProfile } from "../interfaces/user";
import { makePersistable } from "mobx-persist-store";
import LocalStorage from "./localStorage";

export type IUser = IUserRefreshToken & IUserProfile;

class AuthStore {
  user: IUser | null = null;
  accessToken: string | null = null;
  rootStore: any;
  storage = LocalStorage.getInstance();

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: "authStore",
      properties: ["user"],
    });
  }

  setUser(user: IUser | null) {
    this.user = user;
  }

  logout() {
    this.setUser(null);
    this.storage.clear();
  }
}

export default AuthStore;
