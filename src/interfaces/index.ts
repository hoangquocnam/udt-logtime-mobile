import { EApiState } from "../enums";

export interface IStrangerUser {
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

export interface IStrangerUserState {
  value: IStrangerUser[];
  status?: EApiState;
}
