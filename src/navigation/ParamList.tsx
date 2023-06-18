import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootParamList = {
  Auth: undefined;
  Main: undefined;
  Project: undefined;
};

export type RootParamListNavigationProps =
  NativeStackNavigationProp<RootParamList>;

export type AuthParamList = {
  Login: undefined;
};

export type AuthParamListNavigationProps =
  NativeStackNavigationProp<AuthParamList>;

export type MainParamList = {
  Home: undefined;
};

export type MainParamListNavigationProps =
  NativeStackNavigationProp<MainParamList>;

export type ProjectParamList = {
  List: undefined;
  Detail: undefined;
};

export type ProjectParamListNavigationProps =
  NativeStackNavigationProp<ProjectParamList>;
