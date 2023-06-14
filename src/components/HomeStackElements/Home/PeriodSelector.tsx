import SelectDropdown from "react-native-select-dropdown";
import {
  DARK_BLUE,
  DARK_GRAY,
  LIGHTER_GRAY,
  LIGHT_BLUE,
  LIGHT_GREEN,
} from "../../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FormDateTimePicker from "../../UI/FormDatePicker";
import { Text, TouchableNativeFeedback, View } from "react-native";
import t from "../../../theme";
import { format } from "date-fns";

type PeriodSelectorProps = {
  onChange: (value: string) => void;
  onChangeDate: (date: Date) => void;
  date: Date;
};

const PeriodSelector = (props: PeriodSelectorProps) => {
  const { onChange, onChangeDate, date } = props;
  const [currentPeriod, setCurrentPeriod] = useState("week");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const periods = ["day", "week", "month"];

  const buttonText = (currentPeriod: string) => {
    if (currentPeriod === "day") {
      return format(date, "dd/MM/yyyy");
    }
    if (currentPeriod === "week") {
      return format(date, "dd/MM/yyyy");
    }
    if (currentPeriod === "month") {
      return format(date, "MM/yyyy");
    }
    return currentPeriod;
  };

  useEffect(() => {
    if (currentPeriod) {
      setShowDatePicker(currentPeriod === "day");
    }
  }, [currentPeriod]);

  return (
    <>
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
            fontSize: 14,
            flex: 1,
            color: LIGHT_BLUE,
          }}
          rowStyle={{
            borderRadius: 12,
            backgroundColor: "white",
          }}
          rowTextStyle={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
          selectedRowStyle={{
            backgroundColor: LIGHT_BLUE,
          }}
          dropdownStyle={{
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
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
                backgroundColor: showDatePicker ? LIGHT_GREEN : "transparent",
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
    </>
  );
};

export default PeriodSelector;
