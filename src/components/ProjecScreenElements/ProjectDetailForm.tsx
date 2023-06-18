import { VStack, HStack, Text } from "native-base";
import React from "react";
import { SEMI_DARK_BLUE } from "@/theme/colors";
import { ReportDetail } from "@/interfaces/report";
import { formatCash } from "@/utils";
import { ProjectDetail } from "@/interfaces/project";

type Props = {
  reportDetail?: ReportDetail;
  projectDetail?: ProjectDetail;
};

type ReportDetailItemProps = {
  label: string;
  value: string | number | string[];
};

const ReportDetailItem = (props: ReportDetailItemProps) => {
  const { label, value } = props;
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text fontSize={16}>{label}</Text>
      <Text fontSize={14} color={SEMI_DARK_BLUE}>
        {value}
      </Text>
    </HStack>
  );
};

const ProjectReportDetailForm = ({ reportDetail, projectDetail }: Props) => {
  if (!reportDetail || !projectDetail) return null;
  const { defaultRating, currency, rateExchange, paymentCategory } =
    reportDetail;

  const { commitedHours, neededDeveloperNumber, countryId } = projectDetail;

  return (
    <VStack space={5}>
      <ReportDetailItem
        label="Rating ($)"
        value={`${defaultRating} ${currency}`}
      />
      <ReportDetailItem
        label="Rating (VND)"
        value={`${formatCash(rateExchange)}`}
      />
      <ReportDetailItem label="Payment Category" value={paymentCategory} />
      <ReportDetailItem label="Country" value={countryId?.value} />

      <ReportDetailItem
        label="Committed Hours"
        value={
          neededDeveloperNumber !== 0
            ? commitedHours / neededDeveloperNumber
            : 0
        }
      />
    </VStack>
  );
};

export default ProjectReportDetailForm;
