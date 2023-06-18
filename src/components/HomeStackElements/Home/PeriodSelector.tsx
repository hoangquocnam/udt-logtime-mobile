import SelectDropdown from "react-native-select-dropdown";
import { BACKGROUND, DARK_BLUE, LIGHT_BLUE } from "@/theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FormDateTimePicker from "../../UI/FormDatePicker";
import { TouchableNativeFeedback, View } from "react-native";
import t from "@/theme";
import { format } from "date-fns";
import { Box } from "native-base";

type PeriodSelectorProps = {
  onChange: (value: string) => void;
  onChangeDate: (date: Date) => void;
  date: Date;
};

export enum EPeriods {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

const PeriodSelector = (props: PeriodSelectorProps) => {
  const { onChange, onChangeDate, date } = props;
  const [currentPeriod, setCurrentPeriod] = useState(EPeriods.MONTH);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const periods = [EPeriods.DAY, EPeriods.WEEK, EPeriods.MONTH];

  const buttonText = (currentPeriod: string) => {
    if (currentPeriod === EPeriods.DAY) {
      return format(date, "dd/MM/yyyy");
    }
    if (currentPeriod === EPeriods.WEEK) {
      return format(date, "dd/MM/yyyy");
    }
    if (currentPeriod === EPeriods.MONTH) {
      return format(date, "MM/yyyy");
    }
    return currentPeriod;
  };

  useEffect(() => {
    if (currentPeriod) {
      setShowDatePicker(currentPeriod === EPeriods.DAY);
    }
  }, [currentPeriod]);

  return (
    <Box backgroundColor={BACKGROUND}>
      <View style={[t.flexRow]}>
        <SelectDropdown
          data={periods}
          defaultValue={currentPeriod}
          onSelect={(selectedItem, index) => {
            setCurrentPeriod(selectedItem);
            onChange(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return (
              selectedItem +
              (buttonText(selectedItem) ? " - " + buttonText(selectedItem) : "")
            );
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          buttonStyle={{
            backgroundColor: DARK_BLUE,
            flex: 1,
            borderRadius: 14,
            borderWidth: 1,
            paddingHorizontal: 23,
          }}
          buttonTextStyle={{
            textTransform: "capitalize",
            fontWeight: "bold",
            flex: 1,
            color: LIGHT_BLUE,
            fontFamily: "Satoshi",
          }}
          rowStyle={{
            borderRadius: 12,
            backgroundColor: "white",
          }}
          rowTextStyle={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 14,
          }}
          selectedRowStyle={{
            backgroundColor: LIGHT_BLUE,
          }}
          dropdownStyle={{
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
            backgroundColor: "transparent",
          }}
        />
        <TouchableNativeFeedback
          onPress={() => {
            setShowDatePicker(!showDatePicker);
          }}
        >
          <View
            style={[
              t.itemsCenter,
              t.mL2,
              t.justifyCenter,
              {
                backgroundColor: showDatePicker ? LIGHT_BLUE : "transparent",
                padding: 10,
                borderRadius: 12,
              },
            ]}
          >
            <AntDesign
              name="calendar"
              size={24}
              color="black"
              style={{
                alignSelf: "center",
              }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {showDatePicker ? <FormDateTimePicker onChange={onChangeDate} /> : null}
    </Box>
  );
};

export default PeriodSelector;
