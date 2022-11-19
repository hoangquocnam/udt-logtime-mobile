import { EApiState } from "../enums";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string;
  };
  picture: { thumbnail: string };
  login: { uuid: string };
  isFavorite?: boolean;
}

export interface IUserState {
  value: IUser[];
  status?: EApiState;
}