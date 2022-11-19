import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as yup from "yup";
import { IUserLogin } from "../../interfaces";
import t from "../../theme";
import { GRAY } from "../../theme/colors";
import { PasswordInput } from "../UI/PasswordInput";
import { NormalTextInput } from "../UI/TextInput";
import Router from "../../navigation/router";
import { MOCK_ACCOUNT } from "../../constants";
import useToast from "../../hooks/useToast";

const schema = yup
  .object({
    email: yup.string().email().required("Input your email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const navigation = useNavigation();
  const { show } = useToast();
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = method;

  const handleLogin = async (data: IUserLogin) => {
    if (
      data.email === MOCK_ACCOUNT.email &&
      data.password === MOCK_ACCOUNT.password
    ) {
      reset();
      navigation.navigate(Router.Main.value);
    } else {
      show({ message: "Invalid email or password" });
    }
  };

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
          isDirty || !errors
            ? styles.activeButton
            : styles.disabledSubmitButton,
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
    backgroundColor: "purple",
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
