import { LIGHT_BLUE, SEMI_DARK_BLUE, DARK_BLUE } from "@/theme/colors";
import { StackNavigationOptions } from "@react-navigation/stack";
import { VStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text as SVGText } from "react-native-svg";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

export type ProfileChartProps = {
  data: {
    data: ChartData;
    legend: {
      name: string;
      color: string;
    }[];
  } | null;
};

const ProfileChart = ({ data }: ProfileChartProps) => {
  return (
    <VStack space={4} alignItems="center" justifyContent="center">
      {data?.data ? (
        <LineChart
          data={data.data}
          width={Dimensions.get("window").width * 0.9}
          height={350}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: LIGHT_BLUE,
            backgroundGradientFrom: LIGHT_BLUE,
            backgroundGradientTo: LIGHT_BLUE,
            decimalPlaces: 2,
            color: () => DARK_BLUE,
            labelColor: () => SEMI_DARK_BLUE,
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: SEMI_DARK_BLUE,
            },
          }}
          style={{
            borderRadius: 16,
          }}
          withInnerLines={false}
          withOuterLines={false}
          segments={7}
          renderDotContent={({ x, y, indexData }) => {
            return (
              <SVGText
                x={x}
                y={y - 10}
                fill={SEMI_DARK_BLUE}
                fontSize={12}
                fontWeight="bold"
              >
                {indexData}
              </SVGText>
            );
          }}
        />
      ) : null}
    </VStack>
  );
};

export default ProfileChart;

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
};
