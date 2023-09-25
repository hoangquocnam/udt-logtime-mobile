import { HStack, Text, Box } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export enum EDateBarType {
  WEEK = "week",
  MONTH = "month",
  MONTH_TO_DATA = "month-to-date",
}

export type DateBarProps = {
  type: EDateBarType;
  setType?: (type: EDateBarType) => void;
};

const DateBar = (props: DateBarProps) => {
  const { type, setType } = props;

  const TYPES = [EDateBarType.WEEK, EDateBarType.MONTH];

  return (
    <HStack w="100%" space={2} justifyContent="space-between">
      {TYPES.map((item) => (
        <TouchableOpacity onPress={() => setType?.(item)} key={item}>
          <Box
            px={3}
            py={1}
            flex={1}
            alignItems="center"
            bg={item === type ? "blue.100" : "transparent"}
            borderRadius={5}
          >
            <Text color={item === type ? "white" : "darkBlue.800"}>{item}</Text>
          </Box>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

export default DateBar;
