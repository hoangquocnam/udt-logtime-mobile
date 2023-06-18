import { Divider, Text, VStack } from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatCash } from "@/utils";

import { hp, wp } from "@/theme";
import { LIGHT_BLUE, SEMI_DARK_BLUE, DARK_BLUE } from "@/theme/colors";

type Props = {
  value: number;
  currency?: string;
};

const PriceBox = ({ value }: Props) => {
  return (
    <VStack
      bg={LIGHT_BLUE}
      borderRadius={14}
      px={5}
      py={hp(30)}
      alignItems="center"
      justifyContent="center"
      flex={1}
      h={hp(218)}
      space={5}
    >
      <VStack alignItems="center" flex={1} space={2}>
        <FontAwesome5 name="money-bill-alt" size={hp(27)} color={DARK_BLUE} />
        <Text fontSize={hp(18)} fontWeight="400" color={SEMI_DARK_BLUE}>
          Salary
        </Text>
      </VStack>

      <Divider my={2} w="100%" bg={SEMI_DARK_BLUE} />

      <VStack alignItems="center" flex={1}>
        <Text
          fontSize={hp(15)}
          fontWeight="400"
          textAlign="center"
          adjustsFontSizeToFit={true}
          numberOfLines={2}
          color={DARK_BLUE}
        >
          {formatCash(value)}
        </Text>
      </VStack>
    </VStack>
  );
};

export default PriceBox;
