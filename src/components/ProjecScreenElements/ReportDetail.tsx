import { VStack, HStack, Text, Box, Divider } from "native-base";
import React, { useState } from "react";
import { Hourly } from "@/interfaces/report";
import { formatCash } from "@/utils";
import { TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { DARK_BLUE } from "@/theme/colors";

const ReportDetailItem = (props: Hourly) => {
  const { taskName, workingTime, description, startTime, endTime, salary } =
    props;
  const [isShowDescription, setIsShowDescription] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsShowDescription(!isShowDescription)}>
      <VStack w={"full"} alignItems="flex-start" space={2} py={5}>
        <HStack w={"full"} flex={1} justifyContent="space-between" space={3}>
          <VStack flex={1} alignItems="flex-start" w={"full"}>
            <Text w={"full"} numberOfLines={2} fontSize={14}>
              {taskName}
            </Text>
          </VStack>

          <Box alignItems="flex-end" w={10}>
            <Text color={"darkBlue.700"} fontSize={18}>
              {workingTime}
            </Text>
          </Box>
        </HStack>

        <HStack
          w={"full"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack
            flex={1}
            space={1}
            py={5}
            divider={<Divider bg="gray.500" w={0.5} thickness={1} h={5} />}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box bg="success.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"success.700"}>
                {format(new Date(startTime), "HH:mm")}
              </Text>
            </Box>

            <Box bg="danger.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"danger.700"}>
                {format(new Date(endTime), "HH:mm")}
              </Text>
            </Box>
          </HStack>

          <Box alignItems="flex-end" w={10} flex={1}>
            <Text color={"info.700"}>{formatCash(salary)}</Text>
          </Box>
        </HStack>

        {isShowDescription ? (
          <Text
            fontSize={14}
            color={DARK_BLUE}
            w={"full"}
            textAlign={"left"}
            mb={5}
          >
            {description}
          </Text>
        ) : null}
      </VStack>
    </TouchableOpacity>
  );
};

export default ReportDetailItem;
