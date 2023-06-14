import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ProjectDetail } from "../../../interfaces/project";
import { formatCash, getImageUrl, formatDecimal } from "../../../utils";
import { useGetReportProject } from "../../../api/report";
import { format } from "date-fns";
import { DARK_BLUE, SEMI_DARK_BLUE } from "../../../theme/colors";
import { Box, HStack, Image, Spinner, Text, VStack } from "native-base";

type Props = { item: ProjectDetail; period: string; date: Date };

const ProjectListItem = ({ item, period, date }: Props) => {
  const {
    mutateAsync,
    data: dataReportProject,
    isLoading,
  } = useGetReportProject();

  useEffect(() => {
    mutateAsync({
      project: item?._id,
      period: period,
      date: format(date ?? new Date(), "yyyy-MM-dd"),
    });
  }, [item, period, date]);

  return (
    <TouchableOpacity>
      <HStack
        bg={"white"}
        py={3}
        px={4}
        borderRadius={14}
        h={90}
        alignItems={"center"}
        justifyContent={"space-between"}
        space={3}
        shadow={"sm"}
      >
        {isLoading ? (
          <Box w={"full"}>
            <Spinner color={DARK_BLUE} />
          </Box>
        ) : (
          <>
            <HStack flexDir={"row"} alignItems={"center"} space={3} w={"70%"}>
              <Image
                source={{ uri: getImageUrl(item?.logo) }}
                size={63}
                alt={`image-${item?.name}`}
                borderRadius={16}
              />

              <VStack flexShrink={1} space={1}>
                <Text numberOfLines={2} ellipsizeMode="tail" color={DARK_BLUE}>
                  {item?.name}
                </Text>

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  color={SEMI_DARK_BLUE}
                >
                  {formatCash(
                    dataReportProject?.reportDetail?.totalSalary ?? 0
                  )}
                </Text>
              </VStack>
            </HStack>

            <HStack w={"20%"} alignItems={"center"}>
              <Text
                fontSize={14}
                fontWeight={"bold"}
                ml={3}
                color={DARK_BLUE}
                flex={1}
              >
                {formatDecimal(
                  dataReportProject?.reportDetail?.totalWorkingTime ?? 0
                ) + " h"}
              </Text>
            </HStack>
          </>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default ProjectListItem;
