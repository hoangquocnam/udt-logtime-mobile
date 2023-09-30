import { EPeriods } from "@/components/HomeStackElements/Home/PeriodSelector";
import { ProjectDetail } from "@/interfaces/project";
import moment from "moment";
import { useQuery } from "react-query";
import { ErrorResponse, get } from "..";
import { router } from "../router";

export type TDashBoardResult = {
  fullName?: string;
  totalSalary?: number;
  totalWorkingTime?: number;
  lastTotalSalary?: number;
  lastTotalWorkingTime?: number;
  lastNumberOfProjects?: number;
  numberOfProjects?: number;
  commitTimes?: TCommitTime[];
  timesheetData?: TimesheetDatum[];
  projectWorkingTimePieData?: ProjectWorkingTimePieDatum[];
  performanceLineData?: PerformanceLineDatum[];
  salaryBarData?: SalaryBarDatum[];
};

export type TCommitTime = {
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
  commitTime?: number;
  isActive?: boolean;
  isAll?: boolean;
  isAdminUpdated?: boolean;
  developer?: string;
  project?: string;
  updatedBy?: string;
};

export type PerformanceLineDatum = {
  id?: string;
  name?: string;
  color?: string;
  data?: Datum[];
};

export type Datum = {
  x?: string;
  y?: number;
};

export type ProjectWorkingTimePieDatum = {
  id?: string;
  label?: string;
  value?: number;
  color?: string;
};

export type SalaryBarDatum = {
  project?: string;
  "Ztock (WeTrade) (Tradely)"?: number;
  "B13 - web projects (HX, Basis, Connexis, Ono)"?: number;
  Total?: number;
};

export type TimesheetDatum = {
  _id?: ID;
  projectPaymentCategory?: string;
  userPaymentCategory?: string;
  projectData?: ProjectDetail;
  developerData?: DeveloperData;
  workingHours?: number;
  salary?: number;
  timesheetIds?: string[];
  developerOnProjectData?: DeveloperOnProjectData;
  color?: string;
};

export type ID = {
  project?: string;
  developer?: string;
};

export type DeveloperData = {
  _id?: string;
  allowToDownloadCV?: boolean;
  projects?: string[];
  defaultAdmin?: boolean;
  isActive?: boolean;
  isArchived?: boolean;
  isDeleted?: boolean;
  isSupervisor?: boolean;
  projectsOfSupervisor?: string[];
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  partnerId?: string;
  role?: string;
  currentSalary?: number;
  defaultRating?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  updatedBy?: string;
  userData?: UserData;
  bankAccount?: string;
  bankName?: string;
  avatar?: string;
  extraProjects?: any[];
  levelId?: string;
  paymentCategoryId?: string;
  titleId?: string;
  dateOfBirth?: Date;
  fixedSalary?: null;
  joinDate?: Date;
  cv?: string;
  externalProjects?: any[];
  IDIssueDate?: Date;
  IDIssuePlace?: string;
  IDNumber?: string;
  address?: string;
  major?: string;
  nationality?: string;
  placeOfBirth?: string;
  diagramNodeId?: string;
};

export type UserData = {};

export type DeveloperOnProjectData = {
  _id?: string;
  developer?: string;
  project?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isSupervisor?: boolean;
  projectType?: string;
  isDeleted?: boolean;
};

export const getDashBoard = async (period: EPeriods, date?: Date) => {
  const response = await get<TDashBoardResult>(
    router.profile.dashboard.value(
      period,
      moment(date ?? undefined).format("DD-MM-YYYY")
    ),
    {
      v2: true,
    }
  );
  if (response?.error) {
    throw new Error(response.error);
  }
  return response;
};

export const useDashBoard = (period: EPeriods, date?: Date) => {
  return useQuery<
    TDashBoardResult & ErrorResponse,
    Error,
    TDashBoardResult & ErrorResponse,
    any
  >(
    [
      router.profile.dashboard.value(
        period,
        moment(date ?? undefined).format("DD-MM-YYYY")
      ),
    ],
    () => getDashBoard(period, date)
  );
};
