import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View , Text} from "react-native";
import * as yup from "yup";
import { IUser } from "../../interfaces";
import t from "../../theme";
import { GRAY, WHITE } from "../../theme/colors";
import { PasswordInput } from "../UI/PasswordInput";
import { NormalTextInput } from "../UI/TextInput";

const schema = yup
  .object({
    email: yup.string().email().required("Input your email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = method;

  const handleLogin = async (data: IUser) => {};

  return (
    <FormProvider {...method}>
      <NormalTextInput
        name="email"
        placeholder="Email"
        label="What is your email address?"
        autoFocus
      />
      <View style={[t.mY3]} />
      <PasswordInput
        name="password"
        placeholder="Your password"
        label="Enter your password"
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          isDirty ? styles.activeButton : styles.disabledSubmitButton,
        ]}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    height: 36,
    borderRadius: 4,
    marginTop: 40,
  },
  activeButton: {
    backgroundColor: 'purple',
  },
  disabledSubmitButton: {
    backgroundColor: GRAY,
  },
  submitText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default LoginForm;
