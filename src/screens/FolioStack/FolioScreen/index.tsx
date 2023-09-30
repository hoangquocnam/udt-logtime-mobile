import PeriodSelector from "@/components/HomeStackElements/Home/PeriodSelector";
import DateBar from "@/components/UI/DateBar";
import { EChartType } from "@/enums";
import { BACKGROUND, LIGHT_BLUE, DARK_BLUE } from "@/theme/colors";
import { StackNavigationOptions } from "@react-navigation/stack";
import {
  VStack,
  Text,
  ScrollView,
  Box,
  FlatList,
  HStack,
  Circle,
  View,
} from "native-base";
import React from "react";
import { ListRenderItem, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useViewModel from "./useViewModel";
import t from "@/theme";
import ProfileChart from "@/components/FolioScreenElements/DataChart";
import { ProjectDetail } from "@/interfaces/project";
import ProjectProfileTotalListItem from "@/components/ProfileStackElements/ProjectProfileTotalListItem";

const FolioScreen = () => {
  const {
    chartPerformanceData,
    performanceType,
    setPerformanceType,
    selectedDate,
    onChangePeriod,
    onChangeDate,
    period,
    projects,
    totalData,
    isFetching,
    onRefresh,
  } = useViewModel();

  const renderItem: ListRenderItem<ProjectDetail> = ({ item }) => (
    <ProjectProfileTotalListItem
      item={item}
      period={period}
      date={selectedDate}
      total={totalData}
    />
  );

  const ItemSeparator = () => {
    return <View style={[t.h5]} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#1e293b",
      }}
      edges={["top"]}
    >
      <ScrollView flex={1} h={"100%"} bg={BACKGROUND}>
        <VStack
          space={6}
          justifyContent="center"
          divider={<Box h={0.5} bg={LIGHT_BLUE} />}
        >
          <VStack space={5}>
            <Box
              justifyContent="space-around"
              backgroundColor={BACKGROUND}
              p={5}
              borderBottomWidth={1}
              borderBottomColor={LIGHT_BLUE}
            >
              <PeriodSelector
                onChange={onChangePeriod}
                onChangeDate={onChangeDate}
                date={selectedDate}
              />
            </Box>
            <DateBar
              type={performanceType}
              setType={setPerformanceType}
              data={[EChartType.TIME, EChartType.SALARY]}
            />

            <ProfileChart data={chartPerformanceData} />

            <FlatList
              data={chartPerformanceData?.legend}
              renderItem={({ item }) => (
                <HStack
                  px={5}
                  py={2}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Circle size={4} bg={item.color} />
                  <Text>{item.name}</Text>
                </HStack>
              )}
              keyExtractor={(item) => item.name}
              numColumns={2}
            />
          </VStack>

          <VStack style={[t.mB5]} space={3} flex={1} pb={10} h={"100%"}>
            <Box>
              <Text fontSize={24} fontWeight={"bold"} color={DARK_BLUE}>
                Total
              </Text>
            </Box>
            <FlatList<ProjectDetail>
              data={projects}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
              style={{ flex: 1, height: "100%" }}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FolioScreen;

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
};
