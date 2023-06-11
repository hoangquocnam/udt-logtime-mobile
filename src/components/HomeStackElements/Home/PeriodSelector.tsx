import SelectDropdown from "react-native-select-dropdown";
import { DARK_GRAY, LIGHTER_GRAY, LIGHT_GREEN } from "../../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

type PeriodSelectorProps = {
  onChange: (value: string) => void;
};

const PeriodSelector = (props: PeriodSelectorProps) => {
  const { onChange } = props;
  const [currentPeriod, setCurrentPeriod] = useState("month");
  const periods = ["month", "day", "week"];

  
  return (
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
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonStyle={{
        backgroundColor: DARK_GRAY,
        width: "100%",
        borderRadius: 12,
        borderWidth: 1,
      }}
      buttonTextStyle={{
        textTransform: "capitalize",
        fontWeight: "bold",
        color: LIGHTER_GRAY,
      }}
      rowStyle={{
        borderRadius: 12,
      }}
      rowTextStyle={{
        textTransform: "capitalize",
      }}
      selectedRowStyle={{
        backgroundColor: LIGHT_GREEN,
      }}
      dropdownStyle={{
        borderRadius: 12,
      }}
      renderDropdownIcon={() => {
        return <AntDesign name="downcircleo" size={24} color={LIGHTER_GRAY} />;
      }}
    />
  );
};

export default PeriodSelector;
