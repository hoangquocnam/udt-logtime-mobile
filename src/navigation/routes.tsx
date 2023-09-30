import {
  AuthParamList,
  ProfileParamList,
  MainParamList,
  ProjectParamList,
  RootParamList,
} from "./ParamList";

type KeyOf<T> = keyof T;

type KeyOfMainParamList = KeyOf<MainParamList>;
type KeyOfProjectParamList = KeyOf<ProjectParamList>;
type KeyOfAuthParamList = KeyOf<AuthParamList>;
type KeyOfRootParamList = KeyOf<RootParamList>;
type keyOfProfileParamList = KeyOf<ProfileParamList>;

const routes = {
  root: {
    value: "Root",
    auth: "Auth" as KeyOfRootParamList,
    main: "Main" as KeyOfRootParamList,
    project: "Project" as KeyOfRootParamList,
  },
  main: {
    value: "Main",
    home: "Home" as KeyOfMainParamList,
    profile: "ProfileStack" as KeyOfMainParamList,
    folio: "FolioStack" as KeyOfMainParamList,
  },
  project: {
    value: "Project",
    detail: "ProjectDetail" as KeyOfProjectParamList,
    list: "ProjectList" as KeyOfProjectParamList,
  },
  auth: {
    value: "Auth",
    login: "Login" as KeyOfAuthParamList,
  },
  profile: {
    value: "Profile" as keyOfProfileParamList,
  },
};

export default routes;
