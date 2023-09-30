import { makeAutoObservable } from "mobx";
import { IUserRefreshToken, IUserProfile } from "../interfaces/user";
import { makePersistable } from "mobx-persist-store";

export type IUser = IUserRefreshToken & IUserProfile;

class AuthStore {
  user: IUser | null = null;
  accessToken: string | null = null;
  rootStore: any;

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
}

export default AuthStore;
