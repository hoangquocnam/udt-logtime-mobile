import React, { useEffect, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { ProjectDetail } from "@/interfaces/project";
import { formatCash, getImageUrl, formatDecimal } from "@/utils";
import { useGetReportProject } from "@/api/get/get.projects.report";
import { format } from "date-fns";
import { DARK_BLUE, SEMI_DARK_BLUE } from "@/theme/colors";
import { Box, HStack, Image, Spinner, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  ProjectParamListNavigationProps,
  RootParamListNavigationProps,
} from "@/navigation/ParamList";
import routes from "@/navigation/routes";

type Props = {
  item: ProjectDetail;
  period: string;
  date: Date;
  total: {
    totalSalary: number;
    totalWorkingTime: number;
  };
};

const ProjectProfileTotalListItem = ({ item, period, date, total }: Props) => {
  const navigation = useNavigation<
    RootParamListNavigationProps & ProjectParamListNavigationProps
  >();
  const {
    mutateAsync,
    data: dataReportProject,
    isLoading,
  } = useGetReportProject();

  const percentSalary = useMemo(() => {
    return (
      ((dataReportProject?.reportDetail?.totalSalary ?? 0) /
        (total?.totalSalary ?? 1)) *
      100
    );
  }, [dataReportProject, total]);

  const percentWorkingTime = useMemo(() => {
    return (
      ((dataReportProject?.reportDetail?.totalWorkingTime ?? 0) /
        (total?.totalWorkingTime ?? 1)) *
      100
    );
  }, [dataReportProject, total]);

  const goToProjectDetail = () => {
    // @ts-ignore
    navigation.navigate(routes.root.project, {
      screen: routes.project.detail,
      params: {
        id: item?._id,
        logo: item?.logo,
      },
    });
  };

  useEffect(() => {
    mutateAsync({
      project: item?._id,
      period: period,
      date: format(date ?? new Date(), "yyyy-MM-dd"),
    });
  }, [item, period, date]);

  return (
    <TouchableOpacity onPress={goToProjectDetail}>
      <HStack
        bg={"white"}
        py={7}
        px={6}
        borderRadius={14}
        alignItems={"center"}
        justifyContent={"space-between"}
        space={3}
        shadow={"sm"}
        borderWidth={1}
        borderColor={"gray.200"}
      >
        {isLoading ? (
          <Box w={"full"}>
            <Spinner color={DARK_BLUE} />
          </Box>
        ) : (
          <>
            <HStack flexDir={"row"} alignItems={"center"} space={3} w={"30%"}>
              <VStack flexShrink={1} space={2} alignItems={"center"}>
                <Image
                  source={{ uri: getImageUrl(item?.logo) }}
                  size={10}
                  alt={`image-${item?.name}`}
                  borderRadius={16}
                />

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  color={DARK_BLUE}
                  width="full"
                  textAlign={"center"}
                >
                  {item?.name}
                </Text>
              </VStack>
            </HStack>

            <VStack
              justifyContent={"space-between"}
              flex={1}
              space={2}
              alignItems={"center"}
            >
              <Box
                flex={1}
                h={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text
                  ellipsizeMode="tail"
                  color={SEMI_DARK_BLUE}
                  textAlign={"center"}
                >
                  {formatCash(
                    dataReportProject?.reportDetail?.totalSalary ?? 0
                  )}
                </Text>
              </Box>

              <Box
                flex={1}
                h={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
                backgroundColor={"blueGray.700"}
                borderRadius={10}
                px={2}
              >
                <Text
                  ellipsizeMode="tail"
                  color={"blueGray.100"}
                  textAlign={"center"}
                >
                  {`${formatDecimal(percentSalary)}%`}
                </Text>
              </Box>
            </VStack>

            <VStack
              justifyContent={"space-between"}
              flex={1}
              space={2}
              alignItems={"center"}
            >
              <Box
                flex={1}
                h={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text fontSize={14} fontWeight={"bold"} textAlign={"center"}>
                  {formatDecimal(
                    dataReportProject?.reportDetail?.totalWorkingTime ?? 0
                  ) + " h"}
                </Text>
              </Box>

              <Box
                flex={1}
                h={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
                backgroundColor={"blueGray.700"}
                borderRadius={10}
                px={2}
              >
                <Text
                  ellipsizeMode="tail"
                  color={"blueGray.100"}
                  textAlign={"center"}
                >
                  {`${formatDecimal(percentWorkingTime)}%`}
                </Text>
              </Box>
            </VStack>
          </>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default ProjectProfileTotalListItem;
