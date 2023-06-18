import {
  VStack,
  HStack,
  Text,
  FlatList,
  Box,
  Divider,
  Skeleton,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Hourly } from "@/interfaces/report";
import { checkValidArray, formatCash } from "@/utils";
import { ListRenderItem, TouchableOpacity } from "react-native";
import { useGetReportProject } from "@/api/report";
import { format } from "date-fns";
import { DARK_BLUE } from "@/theme/colors";

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
  const { taskName, workingTime, description, startTime, endTime, salary } =
    props;
  const [isShowDescription, setIsShowDescription] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsShowDescription(!isShowDescription)}>
      <VStack w={"full"} alignItems="flex-start" space={2} py={5}>
        <HStack w={"full"} flex={1} justifyContent="space-between" space={3}>
          <VStack flex={1} alignItems="flex-start" w={"full"}>
            <Text w={"full"} numberOfLines={2} fontSize={14}>
              {taskName}
            </Text>
          </VStack>

          <Box alignItems="flex-end" w={10}>
            <Text color={"darkBlue.700"} fontSize={18}>
              {workingTime}
            </Text>
          </Box>
        </HStack>

        <HStack
          w={"full"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack flex={1} space={3} py={5} divider={<Divider bg="gray.500" />}>
            <Box bg="success.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"success.700"}>
                {format(new Date(startTime), "HH:mm")}
              </Text>
            </Box>

            <Box bg="danger.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"danger.700"}>
                {format(new Date(endTime), "HH:mm")}
              </Text>
            </Box>
          </HStack>

          <Box alignItems="flex-end" w={10} flex={1}>
            <Text color={"info.700"}>{formatCash(salary)}</Text>
          </Box>
        </HStack>

        {isShowDescription ? (
          <Text
            fontSize={14}
            color={DARK_BLUE}
            w={"full"}
            textAlign={"left"}
            mb={5}
          >
            {description}
          </Text>
        ) : null}
      </VStack>
    </TouchableOpacity>
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
