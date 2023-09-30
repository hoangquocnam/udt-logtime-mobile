import {
  VStack,
  Text,
  FlatList,
  Divider,
  Skeleton,
} from "native-base";
import React, { useEffect } from "react";
import { Hourly } from "@/interfaces/report";
import { checkValidArray } from "@/utils";
import { ListRenderItem } from "react-native";
import { useGetReportProject } from "@/api/get/get.projects.report";
import { format } from "date-fns";
import ReportDetailItem from "./ReportDetail";

type Props = {
  data?: Hourly[];
  selectedDate?: Date;
  projectId?: string;
};

type WeekStartEnd = {
  start: Date;
  end: Date;
  index: number;
};

type WeekReportProps = {
  projectId?: string;
  week: WeekStartEnd;
};

const WeekReport = ({ week, projectId }: WeekReportProps) => {
  if (!projectId) return null;

  const renderItem: ListRenderItem<Hourly> = ({ item }) => (
    <ReportDetailItem {...item} />
  );

  const {
    mutateAsync,
    data: dataReportProject,
    isLoading: isLoadingReport,
  } = useGetReportProject(`${projectId}-${week.index.toString()}`);

  const getData = async () => {
    return await mutateAsync({
      project: projectId,
      date: format(week.start, "yyyy-MM-dd"),
      period: "week",
    });
  };

  useEffect(() => {
    getData();
  }, [projectId]);

  if (isLoadingReport) {
    return <Skeleton h="40" />;
  }

  return (
    <VStack space={5} w="full">
      <Text fontSize={16} fontWeight="bold">
        {`Week ${week.index}`}
      </Text>
      {checkValidArray(dataReportProject?.timesheets?.hourly) ? (
        <FlatList
          data={dataReportProject?.timesheets?.hourly}
          renderItem={renderItem}
          flex={1}
          w="full"
          h={200}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Divider w="full" bg="gray.200" />}
        />
      ) : null}
    </VStack>
  );
};

const ReportList = ({ data, selectedDate = new Date(), projectId }: Props) => {
  if (!checkValidArray(data) || !projectId) return null;

  const renderItem: ListRenderItem<Hourly> = ({ item }) => (
    <ReportDetailItem {...item} />
  );

  return (
    <VStack space={5} w="full">
      <FlatList
        data={data}
        renderItem={renderItem}
        flex={1}
        w="full"
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider w="full" bg="gray.200" />}
      />
    </VStack>
  );
};

export default ReportList;
