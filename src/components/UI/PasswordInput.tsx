import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import t from "../../theme";
import { PRIMARY } from "../../theme/colors";
import {
  focusInputStyle,
  inputErrorStyle,
  labelStyle,
  inputStyles,
} from "./styles";

interface ICustomPasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export const PasswordInput = (props: ICustomPasswordInputProps) => {
  const { placeholder, name, label } = props;
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;
  const [isShowPassword, setShowPassword] = useState(false);
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onStyleBlur = () => setFocused(false);
  const handleViewPassword = () => {
    setShowPassword((pre) => !pre);
  };

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              isFocused
                ? (focusInputStyle as ViewProps)
                : (inputStyles as ViewProps),
              t.flexRow,
              t.itemsCenter,
              errors.password && inputErrorStyle,
            ]}
          >
            <TextInput
              placeholderTextColor={"gray"}
              placeholder={placeholder}
              style={[t.flex1, t.hFull]}
              secureTextEntry={!isShowPassword}
              onChangeText={(text) => {
                onChange(text);
              }}
              onBlur={() => {
                onBlur();
                onStyleBlur();
              }}
              onFocus={onFocus}
              value={value}
            />
            <TouchableOpacity onPress={handleViewPassword}>
              <Ionicons
                name={isShowPassword ? "eye" : "eye-off"}
                size={24}
                color={PRIMARY}
              />
            </TouchableOpacity>
          </View>
        )}
        name={name}
      />
    </View>
  );
};
