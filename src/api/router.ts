import Constants from "expo-constants";
const API_URL = Constants.manifest.extra.API_URL;

export const AuthRouter = {
  value: `${API_URL}/auth`,
  login: {
    value: `${API_URL}/auth/login`,
  },
};
