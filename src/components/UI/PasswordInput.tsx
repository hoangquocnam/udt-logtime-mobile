import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, View, ViewProps, TouchableOpacity } from "react-native";
import t from "../../theme";
import { DARK_BLUE, LIGHT_BLUE, PRIMARY, SEMI_DARK_BLUE } from "../../theme/colors";
import {
  focusInputStyle,
  inputErrorStyle,
  labelStyle,
  inputStyles,
} from "./styles";
import { Box, Input, Text } from "native-base";

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
          <View>
            <Input
              placeholderTextColor={"gray"}
              placeholder={placeholder}
              secureTextEntry={!isShowPassword}
              rightElement={
                <TouchableOpacity onPress={handleViewPassword}>
                  <Box mx={2}>
                    <Ionicons
                      name={isShowPassword ? "eye" : "eye-off"}
                      size={24}
                      color={DARK_BLUE}
                    />
                  </Box>
                </TouchableOpacity>
              }
              onChangeText={(text) => {
                onChange(text);
              }}
              onBlur={() => {
                onBlur();
                onStyleBlur();
              }}
              onFocus={onFocus}
              borderWidth={2}
              focusOutlineColor={DARK_BLUE}
              borderColor={LIGHT_BLUE}
              backgroundColor={"white"}
              padding={3}
              h={50}
              borderRadius={10}
              value={value}
            />
          </View>
        )}
        name={name}
      />
    </View>
  );
};
