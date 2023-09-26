import { HStack, Text, Box } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import capitalize from "lodash/capitalize";

export type DateBarProps<T extends string> = {
  type: T;
  setType?: (type: T) => void;
  data: T[];
};

const DateBar = <T extends string>(props: DateBarProps<T>) => {
  const { type, setType, data } = props;

  return (
    <HStack w="100%" space={2} justifyContent="space-around">
      {data.map((item) => (
        <TouchableOpacity
          onPress={() => setType?.(item)}
          key={item}
          style={{ flex: 1 }}
        >
          <Box
            px={3}
            py={1}
            flex={1}
            w="100%"
            alignItems="center"
            bg={item === type ? "blue.100" : "transparent"}
            borderRadius={5}
          >
            <Text color={item === type ? "white" : "darkBlue.800"}>
              {capitalize(item)}
            </Text>
          </Box>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

export default DateBar;
