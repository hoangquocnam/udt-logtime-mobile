import Constants from "expo-constants";
export const API_URL =
  process.env.API_URL ||
  Constants.manifest?.extra?.API_URL ||
  "https://app.udt.group/v1/";

export const COMPANY_URL =
  process.env.COMPANY_URL ||
  Constants.manifest?.extra?.COMPANY_URL ||
  "https://app.udt.group/";

export const API_URL_V2 = COMPANY_URL + "v2/v1/";

export const router = {
  value: `${API_URL}/auth`,
  login: {
    value: `${API_URL}/auth/login`,
    v2: {
      value: `${API_URL_V2}/auth/login`,
    },
  },
  project: {
    report: {
      detail: {
        value: `${API_URL}/report-timesheet/report/detail`,
      },
    },
  },
  projects: {
    listOfUser: {
      value: `${API_URL_V2}/projects/list-of-user`,
    },
    detail: {
      value: (id: string) => `${API_URL}/projects/detail-of-user/${id}`,
    },
  },
  profile: {
    dashboard: {
      value: (period: string, date?: string) =>
        `${API_URL_V2}/users/dashboard?period=${period}&date=${date}`,
    },
    profile: {
      // /v2/v1/users/profile/detail
      value: `${API_URL_V2}/users/profile/detail`,
    },
  },
  timesheet: {
    list: {
      value: `${API_URL_V2}/timesheet/list`,
    },
  },
};
