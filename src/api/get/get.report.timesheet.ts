import { useQuery } from "react-query";
import { get } from "..";
import { router } from "../router";

export type TReportTimesheets = {
  groups?: Group[];
  timesheets?: TTimesheetTicket[];
};

export type Group = {
  id?: string;
  title?: string;
};

export type TTimesheetTicket = {
  description?: string;
  end_time?: Date;
  group?: string;
  id?: string;
  start_time?: Date;
  tags?: any[];
  timesheetProject?: TTimesheetProject;
  title?: string;
};

export type TTimesheetProject = {
  canOverlap?: boolean;
  color?: string;
  commitedHours?: number;
  companyName?: string;
  country?: string;
  createdAt?: Date;
  createdBy?: string;
  currency?: string;
  customer?: string;
  customerEmail?: string;
  customerPhone?: string;
  id?: string;
  isActive?: boolean;
  isArchived?: boolean;
  isPastLock?: boolean;
  margin?: number;
  name?: string;
  neededDeveloperNumber?: number;
  partnerId?: string;
  paymentCategory?: string;
  paymentPeriod?: number;
  price?: number;
  rateExchange?: string;
  requiredTag?: boolean;
  startedDate?: Date;
  technology?: string[];
  type?: string[];
  untilNow?: boolean;
  updatedAt?: Date;
  updatedBy?: string;
};

export const getReportTimeSheets = async () => {
  const response = await get<{
    data: TReportTimesheets;
  }>(router.timesheet.list.value, {
    v2: true,
  });

  if (response.error || response?.message) {
    throw new Error(response.error || response?.message);
  }

  return response.data;
};

export const useGetReportTimeSheets = () => {
  return useQuery([router.timesheet.list.value], () => getReportTimeSheets(), {
    keepPreviousData: true,
  });
};
