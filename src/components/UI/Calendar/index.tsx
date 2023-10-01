import { Circle, FlatList, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { fonts } from "@/theme/fonts";

type TCalendarProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

type WeekDate = {
  date: Date;
  day: string;
};

const Calendar = ({ selectedDate, setSelectedDate }: TCalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(selectedDate);

  const weekDays = React.useMemo<WeekDate[]>(() => {
    const weekDays: WeekDate[] = [];
    for (let i = 0; i <= 6; i++) {
      const date = moment(currentDate)
        .startOf("isoWeek")
        .add(i, "day")
        .toDate();
      weekDays.push({
        date,
        day: moment(date).format("ddd"),
      });
    }
    return weekDays;
  }, [currentDate]);

  const onPrevWeek = () => {
    setCurrentDate(moment(currentDate).subtract(1, "week").toDate());
  };

  const onNextWeek = () => {
    setCurrentDate(moment(currentDate).add(1, "week").toDate());
  };

  const renderItem = ({ item }: { item: WeekDate }) => {
    const isSelectedDate = moment(item.date).isSame(selectedDate, "day");
    const isToday = moment(item.date).isSame(new Date(), "day");
    return (
      <Pressable
        onPress={() => {
          setSelectedDate(item.date);
        }}
      >
        <VStack
          space={1}
          p={2}
          borderRadius={10}
          alignItems={"center"}
          justifyContent={"center"}
          bg={isSelectedDate ? "lightBlue.500" : "white"}
        >
          <VStack space={1} alignItems={"center"} justifyContent={"center"}>
            <Text
              fontSize={20}
              color={isSelectedDate ? "darkBlue.500" : "gray.500"}
            >
              {item.date.getDate()}
            </Text>
            <Circle size={1.5} bg={isToday ? "darkBlue.500" : "transparent"} />
          </VStack>
          <Text fontSize={12} fontFamily={fonts.regular} fontWeight={"400"}>
            {item.day}
          </Text>
        </VStack>
      </Pressable>
    );
  };

  return (
    <VStack
      w={"100%"}
      shadow={"3"}
      p={3}
      bg={"white"}
      borderRadius={10}
      space={4}
    >
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={14} fontFamily={fonts.regular} fontWeight={"400"}>
          {moment(selectedDate).format("MMMM, YYYY")}
        </Text>
        <HStack space={2}>
          <Pressable onPress={onPrevWeek}>
            <Feather name="chevron-left" size={24} color="black" />
          </Pressable>
          <Pressable onPress={onNextWeek}>
            <Feather name="chevron-right" size={24} color="black" />
          </Pressable>
        </HStack>
      </HStack>
      <FlatList
        w={"100%"}
        data={weekDays}
        renderItem={renderItem}
        keyExtractor={(item) => item.day}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      />
    </VStack>
  );
};

export default Calendar;
