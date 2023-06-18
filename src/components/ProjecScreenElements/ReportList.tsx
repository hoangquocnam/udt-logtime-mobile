import {
  VStack,
  HStack,
  Text,
  FlatList,
  Box,
  Divider,
  Skeleton,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import * as DateFns from "date-fns";
import { Hourly } from "@/interfaces/report";
import { checkValidArray, getValidArray } from "@/utils";
import { ListRenderItem } from "react-native";
import { useGetReportProject } from "@/api/report";
import { format } from "date-fns";
import { SEMI_DARK_BLUE } from "@/theme/colors";

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

const ReportDetailItem = (props: Hourly) => {
  const { taskName, workingTime } = props;
  return (
    <HStack w={"full"} flex={1} justifyContent="space-between" space={3} py={5}>
      <VStack flex={1} alignItems="flex-start" w={"full"}>
        <Text w={"full"} numberOfLines={2} fontSize={14}>
          {taskName}
        </Text>
      </VStack>

      <Box alignItems="flex-end" w={10}>
        <Text color={SEMI_DARK_BLUE}>{workingTime}</Text>
      </Box>
    </HStack>
  );
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

  console.log(
    "dataReportProject " + `${projectId}-${week.index.toString()}`,
    checkValidArray(dataReportProject?.timesheets?.hourly)
  );

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
