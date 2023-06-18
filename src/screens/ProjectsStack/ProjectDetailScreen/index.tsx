import React, { useEffect } from "react";
import { useStores } from "@/hooks/useStores";
import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProjectParamList } from "@/navigation/ParamList";
import { useGetReportProject } from "@/api/report";
import { format } from "date-fns";
import { BACKGROUND, DARK_BLUE, LIGHT_BLUE } from "@/theme/colors";
import { ActivityIndicator, SafeAreaView } from "react-native";
import BackIcon from "@/components/UI/Icon/BackIcon";
import { getImageUrl } from "@/utils";
import PriceBox from "@/components/ProjecScreenElements/PriceBox";
import TimeBox from "@/components/ProjecScreenElements/TimeBox";
import ProjectReportDetailForm from "@/components/ProjecScreenElements/ReportDetailForm";
import { useGetProject } from "@/api/projects";

type Props = NativeStackScreenProps<ProjectParamList, "ProjectDetail">;

const ProjectDetailScreen = (props: Props) => {
  const { authStore } = useStores();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const { route } = props;
  const { id, logo } = route.params;

  const { data: dataProject, isLoading: isLoadingProject } = useGetProject(id);

  const {
    mutateAsync,
    data: dataReportProject,
    isLoading: isLoadingReport,
  } = useGetReportProject();

  useEffect(() => {
    mutateAsync({
      project: id,
      period: "month",
      date: format(date ?? new Date(), "yyyy-MM-dd"),
    });
  }, [id]);

  if (isLoadingReport || isLoadingProject) {
    return (
      <SafeAreaView
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <VStack h="full" bg={BACKGROUND}>
      <ScrollView px={5} py={5}>
        <VStack space={5}>
          <VStack w="full" alignItems={"center"} space={5}>
            <Image
              source={{ uri: getImageUrl(logo) }}
              size={105}
              alt={`image-${logo}`}
              borderRadius={16}
              alignSelf="center"
            />
            <Text
              fontWeight={"600"}
              fontSize={20}
              color={DARK_BLUE}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {dataReportProject?.reportDetail?.projectName}
            </Text>
          </VStack>

          <HStack px={4} py={5} space={4}>
            <PriceBox
              value={dataReportProject?.reportDetail?.totalSalary || 0}
            />
            <TimeBox
              value={dataReportProject?.reportDetail?.totalWorkingTime || 0}
            />
          </HStack>

          <VStack space={5} w="full" p={5} bg="white" borderRadius={14}>
            <ProjectReportDetailForm
              reportDetail={dataReportProject?.reportDetail}
              projectDetail={dataProject}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default ProjectDetailScreen;

export const screenOptions = {
  headerShown: true,
  title: "",
  headerBackImage: () => <BackIcon />,
  headerBackTitle: "",
};
