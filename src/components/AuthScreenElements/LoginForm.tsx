import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import t from "../../theme";
import { DARK_BLUE, ERROR } from "../../theme/colors";
import { PasswordInput } from "../UI/PasswordInput";
import { NormalTextInput } from "../UI/TextInput";
import useToast from "../../hooks/useToast";
import { IUserLogin } from "../../interfaces/user";
import { useMe, usePostLogin } from "../../api/auth";
import appRoutes from "../../navigation/routes";
import LocalStorage from "../../store/localStorage";
import { Button, Text, VStack } from "native-base";
import { useStores } from "../../hooks/useStores";

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
  const storage = LocalStorage.getInstance();
  const { authStore } = useStores();

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
    };

    if (dataLogin?.user) {
      authStore.setUser(dataLogin?.user);
      onLoginSuccess();
    }
  }, [dataLogin]);

  useEffect(() => {
    if (me) {
      authStore.setUser(me?.user);
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
      <VStack space={5}>
        <NormalTextInput
          name="email"
          placeholder="Email"
          label="What is your email address?"
          autoFocus
        />
        <PasswordInput
          name="password"
          placeholder="Your password"
          label="Enter your password"
        />

        <Button
          onPress={handleSubmit(handleLogin)}
          bgColor={DARK_BLUE}
          borderRadius={14}
          disabled={!isDirty}
          _pressed={{ opacity: 0.8 }}
        >
          <Text style={[styles.submitText]}>Login</Text>
        </Button>
      </VStack>
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
  disabledSubmitButton: {},
  submitText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default LoginForm;
