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
import { ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useViewModel from "./useViewModel";
import t from "@/theme";
import FolioChart from "@/components/FolioStackElements/DataChart";
import { ProjectDetail } from "@/interfaces/project";
import ProjectFolioTotalListItem from "@/components/FolioStackElements/ProjectFolioTotalListItem";

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
  } = useViewModel();

  const renderItem: ListRenderItem<ProjectDetail> = ({ item }) => (
    <ProjectFolioTotalListItem
      item={item}
      period={period}
      date={selectedDate}
    />
  );

  const ItemSeparator = () => {
    return <View style={[t.h5]} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <ScrollView flex={1} h={"100%"} bg={BACKGROUND} pt={1}>
        <VStack
          px={5}
          space={4}
          justifyContent="center"
          divider={<View style={[t.h0_5, t.bgGray400, t.mY8]} />}
        >
          <Box>
            <Text fontSize={24} fontWeight={"bold"} color={DARK_BLUE}>
              Folio
            </Text>
          </Box>

          <VStack space={6}>
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

            <FolioChart data={chartPerformanceData} />

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
