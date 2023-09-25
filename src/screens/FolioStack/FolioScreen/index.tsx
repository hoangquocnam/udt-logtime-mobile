import PeriodSelector from "@/components/HomeStackElements/Home/PeriodSelector";
import DateBar from "@/components/UI/DateBar";
import { EChartType } from "@/enums";
import {
  BACKGROUND,
  LIGHT_BLUE,
  SEMI_DARK_BLUE,
  DARK_BLUE,
} from "@/theme/colors";
import { StackNavigationOptions } from "@react-navigation/stack";
import { VStack, Text, ScrollView, Box } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import useViewModel from "./useViewModel";

const FolioScreen = () => {
  const {
    chartPerformanceData,
    performanceType,
    setPerformanceType,
    selectedDate,
    onChangePeriod,
    onChangeDate,
  } = useViewModel();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <ScrollView flex={1} h={"100%"} bg={BACKGROUND} pt={1}>
        <VStack px={5} space={4} justifyContent="center">
          <Box>
            <Text fontSize={24} fontWeight={"bold"} color={DARK_BLUE}>
              Folio
            </Text>
          </Box>

          <VStack space={3}>
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
            {chartPerformanceData ? (
              <LineChart
                data={chartPerformanceData}
                width={Dimensions.get("window").width * 0.9}
                height={300}
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: LIGHT_BLUE,
                  backgroundGradientFrom: LIGHT_BLUE,
                  backgroundGradientTo: LIGHT_BLUE,
                  decimalPlaces: 2,
                  color: () => DARK_BLUE,
                  labelColor: () => SEMI_DARK_BLUE,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: SEMI_DARK_BLUE,
                  },
                  verticalLabelsHeightPercentage: 0.5,
                }}
                style={{
                  borderRadius: 16,
                }}
                withInnerLines={false}
                withOuterLines={false}
                segments={7}
              />
            ) : null}
            <DateBar
              type={performanceType}
              setType={setPerformanceType}
              data={[EChartType.TIME, EChartType.SALARY]}
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
