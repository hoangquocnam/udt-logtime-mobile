import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ProjectDetail } from "@/interfaces/project";
import { formatCash, getImageUrl, formatDecimal } from "@/utils";
import { useGetReportProject } from "@/api/report";
import { format } from "date-fns";
import { DARK_BLUE, SEMI_DARK_BLUE } from "@/theme/colors";
import { Box, HStack, Image, Spinner, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  ProjectParamListNavigationProps,
  RootParamListNavigationProps,
} from "@/navigation/ParamList";
import routes from "@/navigation/routes";
import t from "@/theme";

type Props = { item: ProjectDetail; period: string; date: Date };

const ProjectFolioTotalListItem = ({ item, period, date }: Props) => {
  const navigation = useNavigation<
    RootParamListNavigationProps & ProjectParamListNavigationProps
  >();
  const {
    mutateAsync,
    data: dataReportProject,
    isLoading,
  } = useGetReportProject();

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
            <HStack
              flexDir={"row"}
              alignItems={"center"}
              space={3}
              w={"30%"}
              divider={<View style={[t.hFull, t.bgGray400]} />}
            >
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

            <Text
              ellipsizeMode="tail"
              color={SEMI_DARK_BLUE}
              flex={1}
              textAlign={"center"}
            >
              {formatCash(dataReportProject?.reportDetail?.totalSalary ?? 0)}
            </Text>

            <Text
              fontSize={14}
              fontWeight={"bold"}
              ml={3}
              color={DARK_BLUE}
              flex={1}
              textAlign={"center"}
            >
              {formatDecimal(
                dataReportProject?.reportDetail?.totalWorkingTime ?? 0
              ) + " h"}
            </Text>
          </>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default ProjectFolioTotalListItem;
