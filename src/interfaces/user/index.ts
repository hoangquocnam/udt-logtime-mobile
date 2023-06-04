export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserState {
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
  rToken?: string;
  aToken?: string;
  title?: string;
  avatar?: string;
  isSupervisor?: boolean;
}
