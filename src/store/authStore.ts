import { makeAutoObservable } from "mobx";
import { IUserState } from "../interfaces/user";
import { makePersistable } from "mobx-persist-store";

class AuthStore {
  user: IUserState | null = null;
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

  setUser(user: IUserState) {
    this.user = user;
  }
}

export default AuthStore;
