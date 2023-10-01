import { useGetProjects } from "@/api/get/get.projects.many";
import BackIcon from "@/components/UI/Icon/BackIcon";
import { useStores } from "@/hooks/useStores";
import { ReportParamList } from "@/navigation/ParamList";
import { hp } from "@/theme";
import { BACKGROUND } from "@/theme/colors";
import { getValidArray, getImageUrl, checkValidArray } from "@/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationOptions } from "@react-navigation/stack";
import { observer } from "mobx-react";
import {
  FlatList,
  List,
  ScrollView,
  VStack,
  HStack,
  Image,
  Text,
  Pressable,
} from "native-base";
import React, { useEffect } from "react";
import { ListRenderItem } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ProjectDetail } from "@/interfaces/project";
import { Entypo } from "@expo/vector-icons";
import Calendar from "@/components/UI/Calendar";
import {
  TTimesheetTicket,
  useGetReportTimeSheets,
} from "@/api/get/get.report.timesheet";
import moment from "moment";
import TimesheetList from "@/components/UI/TimesheetList";

type Props = NativeStackScreenProps<ReportParamList, "CreateReportScreen">;

const CreateReportScreen: React.FC<Props> = () => {
  const { authStore } = useStores();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [currentProject, setCurrentProject] = React.useState<ProjectDetail>();

  const { data: dataProjects } = useGetProjects();
  const { projects } = dataProjects ?? {};

  const { data: dataReportTimeSheets } = useGetReportTimeSheets();

  useEffect(() => {
    if (checkValidArray(projects)) {
      setCurrentProject(projects?.[0]);
    }
  }, [projects]);

  const convertedTimeSheets = React.useMemo<TTimesheetTicket[]>(() => {
    return getValidArray(dataReportTimeSheets?.timesheets).filter((item) =>
      moment(item.start_time).isSame(selectedDate, "day") ||
      moment(item.end_time).isSame(selectedDate, "day")
        ? item
        : null
    );
  }, [dataReportTimeSheets?.timesheets, selectedDate]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND,
      }}
      edges={["top"]}
    >
      <ScrollView h={"100%"} flex={1}>
        <VStack px={4} space={5} pb={4}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <BackIcon />
            <Pressable>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </Pressable>
          </HStack>

          <HStack space={2}>
            <Image
              source={{ uri: getImageUrl(currentProject?.logo) }}
              size={30}
              alt={`image-${currentProject?.name}`}
              borderRadius={16}
            />
            <Text fontSize={20} fontFamily={"regular"} fontWeight={"600"}>
              {currentProject?.name}
            </Text>
          </HStack>

          <VStack space={5} flex={1}>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </VStack>

          <VStack space={5} flex={1}>
            <TimesheetList data={convertedTimeSheets} />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(CreateReportScreen);

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
  headerTitle: "",
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: BACKGROUND,
    elevation: 0,
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
  headerBackImage: () => null,
};
