import { configureStore } from "@reduxjs/toolkit";
import { IUserState } from "../interfaces";
import userReducer from "./user/reducer";

export interface IRootState {
  user: IUserState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
