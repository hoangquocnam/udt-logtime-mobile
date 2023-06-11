import Constants from "expo-constants";
export const API_URL =
  process.env.API_URL ||
  Constants.manifest.extra.API_URL ||
  "https://app.udt.group/v1/";

export const COMPANY_URL =
  process.env.COMPANY_URL ||
  Constants.manifest.extra.COMPANY_URL ||
  "https://app.udt.group/";

export const router = {
  value: `${API_URL}/auth`,
  login: {
    value: `${API_URL}/auth/login`,
  },
  reports: {
    value: `${API_URL}/report-timesheet`,
    report: {
      value: `${API_URL}/report-timesheet/report`,
      detail: {
        value: `${API_URL}/report-timesheet/report/detail`,
      },
    },
  },
  projects: {
    value: `${API_URL}/projects`,
    listOfUser: {
      value: `${API_URL}/projects/list-of-user`,
    },
  },
};
