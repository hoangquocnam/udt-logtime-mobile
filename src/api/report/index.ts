import { useMutation, useQuery } from "react-query";
import { router } from "../router";
import { authHeader } from "..";
import { ReportDetail, TimeSheet } from "../../interfaces/report";

type DataReportTimesheet = {
  reportDetail: ReportDetail;
  timesheets: TimeSheet;
};

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

type BodyReportTimesheet = {
  project: string;
  period: string;
  date: string;
};

const getReportProject = async (
  body: BodyReportTimesheet
): Promise<DataReportTimesheet> => {
  const auth = await authHeader();
  const response = await fetch(router.reports.report.detail.value, {
    method: "POST",
    headers: auth,
    body: JSON.stringify(body),
  });
  const responseJson: Awaited<{
    message: string;
    data: DataReportTimesheet;
  }> = await response.json();
  if (response.status !== 200) {
    throw new Error(responseJson.message);
  }
  return responseJson.data;
};

export const useGetReportProject = (key?: string) => {
  return useMutation((body: BodyReportTimesheet) => getReportProject(body), {
    mutationKey: ["report", "project", key],
  });
};
