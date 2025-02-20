import { get } from "lodash";
import React, { useState } from "react";
import { TextProps } from "react-native";
import {
  errorStyle,
  focusInputStyle,
  inputErrorStyle,
  inputStyles,
  labelStyle,
} from "./styles";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Text, FormControl } from "native-base";
import { DARK_BLUE, LIGHT_BLUE, SEMI_DARK_BLUE } from "@/theme/colors";

type CustomTextInputProps = {
  name: string;
  label: string;
  placeholder: string;
  textAlign?: "left" | "right" | "center";
  autoFocus?: boolean;
};

export const NormalTextInput = (props: CustomTextInputProps) => {
  const { placeholder, name, textAlign, label } = props;
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onStyleBlur = () => setFocused(false);
  return (
    <>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Input
              placeholder={placeholder}
              placeholderTextColor={"gray"}
              onChangeText={onChange}
              textAlign={textAlign ?? "left"}
              onBlur={() => {
                onBlur();
                onStyleBlur();
              }}
              onFocus={onFocus}
              value={value}
              borderWidth={2}
              focusOutlineColor={DARK_BLUE}
              borderColor={LIGHT_BLUE}
              backgroundColor={"white"}
              padding={3}
              h={50}
              borderRadius={10}
              autoCapitalize="none"
              autoComplete="off"
            />
          );
        }}
      />
      {get(errors, name) ? (
        <Text style={errorStyle as TextProps}>
          {get(errors, name)?.message as String}
        </Text>
      ) : null}
    </>
  );
};
