import { useMutation } from "react-query";
import { router } from "../router";
import { post } from "..";
import { ReportDetail, TimeSheet } from "../../interfaces/report";

type DataReportTimesheet = {
  reportDetail: ReportDetail;
  timesheets: TimeSheet;
};

type BodyReportTimesheet = {
  project: string;
  period: string;
  date: string;
};

const getReportProject = async (
  body: BodyReportTimesheet
): Promise<DataReportTimesheet> => {
  const response = await post<
    {
      message: string;
      data: DataReportTimesheet;
    },
    BodyReportTimesheet
  >(router.reports.report.detail.value, body);
  if (response.error || response?.message) {
    throw new Error(response.error || response?.message);
  }
  return response.data;
};

export const useGetReportProject = (key?: string) => {
  return useMutation((body: BodyReportTimesheet) => getReportProject(body), {
    mutationKey: ["report", "project", key],
  });
};
