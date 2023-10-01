import { TTimesheetTicket } from "@/api/get/get.report.timesheet";
import { Box, Divider, FlatList, HStack, Text, VStack } from "native-base";
import React from "react";
import moment from "moment";
import { getTimeFrames } from "@/utils";
type TTimesheetListProps = {
  data: TTimesheetTicket[];
};

const HEIGHT_TIME_FRAME = 50;
const HEIGHT_TIME_GAP = 10;
const HEIGHT = HEIGHT_TIME_FRAME + HEIGHT_TIME_GAP;
const SESSION = [
  {
    sessionName: "Morning",
    from: "00:00",
    to: "10:30",
    color: "yellow",
  },
  {
    sessionName: "Noon",
    from: "11:00",
    to: "12:30",
    color: "red",
  },
  {
    sessionName: "Afternoon",
    from: "13:00",
    to: "18:30",
    color: "green",
  },
  {
    sessionName: "Evening",
    from: "19:00",
    to: "21:30",
    color: "blue",
  },
  {
    sessionName: "Night",
    from: "22:00",
    to: "24:00",
    color: "purple",
  },
];

const TimesheetList = React.memo(({ data }: TTimesheetListProps) => {
  const timeFrames = getTimeFrames();

  const renderItem = ({ item }: { item: TTimesheetTicket }) => {
    const totalTime = moment(item?.end_time).diff(
      moment(item?.start_time),
      "minutes"
    );
    const totalHours = totalTime / 60;
    const hourStart = moment(item?.start_time).format("HH:mm");
    const hourEnd = moment(item?.end_time).format("HH:mm");

    const selectedTimeFrame = timeFrames.find((tf) => {
      return tf >= hourStart;
    });
    const indexTimeFrame = timeFrames.findIndex((tf) => {
      return tf === selectedTimeFrame;
    });

    const startDelta =
      moment(hourStart, "HH:mm").diff(
        moment(timeFrames[indexTimeFrame], "HH:mm"),
        "minutes"
      ) / 30;

    const top = indexTimeFrame * HEIGHT + startDelta * HEIGHT;
    const height = totalHours * HEIGHT * 2 - HEIGHT_TIME_GAP;

    if (hourStart > hourEnd) {
      return null;
    }

    console.log(item?.timesheetProject);

    return (
      <HStack
        borderRadius={10}
        borderWidth={1}
        flex={1}
        flexShrink={1}
        position={"absolute"}
        top={`${top >= 0 ? top : 0}px`}
        height={`${height >= 0 ? height : 0}px`}
        right={0}
        width={"100%"}
        p={4}
        bg={item?.timesheetProject?.color || "lightBlue.500"}
        space={3}
        borderColor={ "gray.400"}
      >
        <VStack flex={1} space={4} overflow={"hidden"}>
          <Text numberOfLines={2}>{item?.title}</Text>
          <HStack
            space={1}
            divider={<Divider bg="gray.500" w={0.5} thickness={1} h={5} />}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box bg="success.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"success.700"}>
                {hourStart}
              </Text>
            </Box>

            <Box bg="danger.100" borderRadius={5} px={2} py={1}>
              <Text fontSize={14} color={"danger.700"}>
                {hourEnd}
              </Text>
            </Box>
          </HStack>
        </VStack>
        <Text>{totalHours.toFixed(2)}</Text>
      </HStack>
    );
  };

  return (
    <VStack space={4}>
      <Text>Logged ticket</Text>
      <HStack space={3} h="full">
        <VStack
          width={100}
          space={`${HEIGHT_TIME_GAP}px`}
          alignItems={"flex-end"}
          justifyContent={"flex-start"}
        >
          {timeFrames.map((item) => {
            const session = SESSION.find((s) => {
              return s.from <= item && s.to >= item;
            });
            return (
              <Box
                height={`${HEIGHT_TIME_FRAME}px`}
                width={"100%"}
                borderWidth={1}
                bg={`${session?.color}.100` || "white"}
                key={item}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={10}
                borderColor={`${session?.color}.800` || "darkBlue.800"}
              >
                <Text color={`${session?.color}.800` || "darkBlue.800"}>
                  {item}
                </Text>
              </Box>
            );
          })}
        </VStack>
        <FlatList
          data={data}
          flex={1}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item?.id?.toString()}__${index}`}
          contentContainerStyle={{
            position: "relative",
            flex: 1,
            width: "100%",
            backgroundColor: "red.100",
            flexGrow: 1,
          }}
        />
      </HStack>
    </VStack>
  );
});

export default TimesheetList;
