import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, View } from "react-native";
import * as yup from "yup";
import t from "../../theme";
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
  const { handleSubmit } = method;
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
        label="Create a password"
      />
      <View style={[t.flex1]} />

      <View style={[t.mB2, t.itemsEnd]}>
        <Button title="Log In" onPress={handleSubmit(handleRegister)} />
      </View>
    </FormProvider>
  );
};

export default LoginForm;
