import DateBar from "@/components/UI/DateBar";
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
  const { chartData, period, setPeriod } = useViewModel();

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
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={250}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: LIGHT_BLUE,
                backgroundGradientFrom: LIGHT_BLUE,
                backgroundGradientTo: LIGHT_BLUE,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: () => DARK_BLUE,
                labelColor: () => SEMI_DARK_BLUE,
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: SEMI_DARK_BLUE,
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
              withInnerLines={false}
            />

            <DateBar type={period} setType={setPeriod} />
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
