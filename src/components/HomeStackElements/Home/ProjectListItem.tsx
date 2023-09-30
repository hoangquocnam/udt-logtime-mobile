import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
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

type Props = { item: ProjectDetail; period: string; date: Date };

const ProjectListItem = ({ item, period, date }: Props) => {
  const navigation = useNavigation<
    RootParamListNavigationProps & ProjectParamListNavigationProps
  >();
  const {
    mutateAsync,
    data: dataReportProject,
    isLoading,
  } = useGetReportProject();

  const goToProjectDetail = () => {
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
        py={3}
        px={4}
        borderRadius={14}
        h={90}
        alignItems={"center"}
        justifyContent={"space-between"}
        space={3}
        shadow={"sm"}
      >
        {isLoading ? (
          <Box w={"full"}>
            <Spinner color={DARK_BLUE} />
          </Box>
        ) : (
          <>
            <HStack flexDir={"row"} alignItems={"center"} space={3} flex={1}>
              <Image
                source={{ uri: getImageUrl(item?.logo) }}
                size={63}
                alt={`image-${item?.name}`}
                borderRadius={16}
              />

              <VStack flexShrink={1} space={1}>
                <Text numberOfLines={2} ellipsizeMode="tail" color={DARK_BLUE}>
                  {item?.name}
                </Text>

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  color={SEMI_DARK_BLUE}
                >
                  {formatCash(
                    dataReportProject?.reportDetail?.totalSalary ?? 0
                  )}
                </Text>
              </VStack>
            </HStack>

            <HStack  alignItems={"center"}>
              <Text
                fontSize={14}
                fontWeight={"bold"}
                ml={3}
                color={DARK_BLUE}
              >
                {formatDecimal(
                  dataReportProject?.reportDetail?.totalWorkingTime ?? 0
                ) + " h"}
              </Text>
            </HStack>
          </>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default ProjectListItem;
