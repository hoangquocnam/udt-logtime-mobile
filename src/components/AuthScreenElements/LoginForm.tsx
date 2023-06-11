import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import t from "../../theme";
import { ERROR, GRAY } from "../../theme/colors";
import { PasswordInput } from "../UI/PasswordInput";
import { NormalTextInput } from "../UI/TextInput";
import useToast from "../../hooks/useToast";
import { IUserLogin } from "../../interfaces/user";
import { useMe, usePostLogin } from "../../api/auth";
import Routes from "../../navigation/routes";
import Storage from "../../store";

const schema = yup
  .object({
    email: yup.string().email().required("Input your email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const navigation = useNavigation();
  const {
    data: dataLogin,
    mutateAsync,
    isLoading,
    error,
  } = usePostLogin({
    onError: (error: Error) => {
      show({ message: error.message, color: ERROR });
    },
  });
  const storage = Storage.getInstance();

  const { data: me, isLoading: isLoadingMe } = useMe();
  const { show } = useToast();
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = method;

  const handleLogin = async (payload: IUserLogin) => {
    await mutateAsync(payload);
  };

  useEffect(() => {
    const onLoginSuccess = async () => {
      show({ message: "Login success!" });
      await storage.setItem("email", dataLogin?.user?.email);
      await storage.setItem("aToken", dataLogin?.user?.aToken);
      await storage.setItem("rToken", dataLogin?.user?.rToken);
      await
      //@ts-ignore
      navigation.navigate(Routes.Main.value);
    };

    if (dataLogin?.user) {
      onLoginSuccess();
    }
  }, [dataLogin]);

  useEffect(() => {
    if (me) {
      //@ts-ignore
      navigation.navigate(Routes.Main.value);
    }
  }, [me]);

  if (isLoading || isLoadingMe) {
    return (
      <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.submitText}>Login</Text>
        )}
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
