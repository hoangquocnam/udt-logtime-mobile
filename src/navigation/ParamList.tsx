import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootParamList = {
  Auth: undefined;
  Main: undefined;
  Project: undefined;
  Report: undefined;
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
  ProfileStack: undefined;
  FolioStack: undefined;
};

export type MainParamListNavigationProps =
  NativeStackNavigationProp<MainParamList>;

export type ProjectParamList = {
  ProjectList: undefined;
  ProjectDetail: {
    id: string;
    logo?: string;
  };
};

export type ProjectParamListNavigationProps =
  NativeStackNavigationProp<ProjectParamList>;

export type ProfileParamList = {
  Profile: undefined;
};

export type ProfileParamListNavigationProps =
  NativeStackNavigationProp<ProfileParamList>;

export type FolioParamList = {
  Profile: undefined;
};

export type FolioParamListNavigationProps =
  NativeStackNavigationProp<FolioParamList>;

export type ReportParamList = {
  CreateReportScreen: undefined;
};

export type ReportParamListNavigationProps =
  NativeStackNavigationProp<ReportParamList>;
