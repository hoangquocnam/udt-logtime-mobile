import React, { useEffect, useMemo, useState } from "react";
import { View, FlatListProps } from "react-native";
import WheelPicker from "react-native-wheely";
import moment from "moment";
import t from "@/theme";
import { LIGHT_BLUE, SEMI_DARK_BLUE } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

type FormDateTimePickerProps = {
  onChange?: (date: Date) => void;
  value?: Date;
};

const GeneralFlatListProps: Partial<FlatListProps<string | null>> = {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
};

const FormDateTimePicker = ({ onChange, value }: FormDateTimePickerProps) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const styles = useStyles();
  const YEARS: string[] = useMemo(() => {
    const years: string[] = [];
    for (let i = 0; i < 101; i++) {
      const year = moment().subtract(i, "years").format("YYYY");
      years.push(year);
    }
    return years;
  }, []);

  const currentYear = useMemo(() => {
    return YEARS[selectedYearIndex];
  }, [selectedYearIndex]);

  const MONTHS = moment.months();

  const currentMonth = useMemo(() => {
    return MONTHS[selectedMonthIndex];
  }, [selectedMonthIndex, MONTHS]);

  const DAYS = useMemo(() => {
    const days: string[] = [];
    const currentYear = YEARS[selectedYearIndex];
    const daysInMonth = moment(
      `${currentMonth} ${currentYear}`,
      "MMMM YYYY"
    ).daysInMonth();
    if (selectedDayIndex >= daysInMonth) {
      setSelectedDayIndex(daysInMonth - 1);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i.toString());
    }
    return days;
  }, [currentMonth, currentYear]);

  const currentDay = useMemo(() => {
    return DAYS[selectedDayIndex];
  }, [selectedDayIndex, DAYS]);

  const currentDate = useMemo<Date>(() => {
    return moment(
      `${currentMonth} ${currentDay} ${currentYear}`,
      "MMMM D YYYY"
    ).toDate();
  }, [currentMonth, currentDay, currentYear]);

  useEffect(() => {
    onChange?.(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (value) {
      const year = moment(value).format("YYYY");
      const month = moment(value).format("MMMM");
      const day = moment(value).format("D").toString();
      const yearIndex = YEARS.indexOf(year);
      const monthIndex = MONTHS.indexOf(month);
      const dayIndex = DAYS.indexOf(day);

      if (
        YEARS.includes(year) &&
        MONTHS.includes(month) &&
        DAYS.includes(day)
      ) {
        setSelectedYearIndex(yearIndex);
        setSelectedMonthIndex(monthIndex);
        setSelectedDayIndex(dayIndex);
      }
    }
  }, [value]);

  useEffect(() => {
    const now = moment();
    const year = now.format("YYYY");
    const month = now.format("MMMM");
    const day = now.format("D").toString();

    const yearIndex = YEARS.indexOf(year);
    const monthIndex = MONTHS.indexOf(month);
    const dayIndex = DAYS.indexOf(day);

    setSelectedYearIndex(yearIndex);
    setSelectedMonthIndex(monthIndex);
    setSelectedDayIndex(dayIndex);
  }, []);

  return (
    <View style={styles.contentContainerStyle}>
      {/* Month */}
      <WheelPicker
        selectedIndex={selectedMonthIndex}
        options={MONTHS}
        onChange={(index) => setSelectedMonthIndex(index)}
        flatListProps={GeneralFlatListProps}
        containerStyle={styles.pickContainerStyle}
        itemStyle={styles.itemStyle}
        selectedIndicatorStyle={[
          styles.selectedIndicatorStyle,
          styles.firstColumnStyle,
        ]}
        // @ts-ignore
        itemTextStyle={styles.itemTextStyle}
      />

      {/* Day */}
      <WheelPicker
        selectedIndex={selectedDayIndex}
        options={DAYS}
        onChange={(index) => setSelectedDayIndex(index)}
        flatListProps={GeneralFlatListProps}
        containerStyle={styles.pickContainerStyle}
        itemStyle={styles.itemStyle}
        selectedIndicatorStyle={[
          styles.selectedIndicatorStyle,
          styles.secondColumnStyle,
        ]}
        // @ts-ignore
        itemTextStyle={styles.itemTextStyle}
      />

      {/* Year */}
      <WheelPicker
        selectedIndex={selectedYearIndex}
        options={YEARS}
        onChange={(index) => setSelectedYearIndex(index)}
        flatListProps={GeneralFlatListProps}
        containerStyle={styles.pickContainerStyle}
        itemStyle={styles.itemStyle}
        selectedIndicatorStyle={[
          styles.selectedIndicatorStyle,
          styles.thirdColumnStyle,
        ]}
        // @ts-ignore
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
  );
};

const useStyles = () => {
  return {
    contentContainerStyle: [
      t.flexRow,
      t.wFull,
      t.justifyBetween,
      t.bgTransparent,
    ],
    pickContainerStyle: {
      width: `${100 / 3}%`,
    },
    itemStyle: {},
    selectedIndicatorStyle: {
      borderRadius: 0,
      backgroundColor: LIGHT_BLUE,
      borderColor: SEMI_DARK_BLUE,
      borderWidth: 1,
    },
    itemTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: "bold",
    },
    firstColumnStyle: {
      borderRightWidth: 0,
      borderTopStartRadius: 6,
      borderBottomStartRadius: 6,
    },
    secondColumnStyle: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    thirdColumnStyle: {
      borderLeftWidth: 0,
      borderTopEndRadius: 6,
      borderBottomEndRadius: 6,
    },
  };
};

export default FormDateTimePicker;
