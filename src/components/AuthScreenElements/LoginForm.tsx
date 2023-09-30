import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import * as yup from "yup";
import t from "@/theme";
import { DARK_BLUE, ERROR } from "@/theme/colors";
import { PasswordInput } from "../UI/PasswordInput";
import { NormalTextInput } from "../UI/TextInput";
import useToast from "@/hooks/useToast";
import { IUserLogin } from "@/interfaces/user";
import { useMe, usePostLogin, usePostLoginV2 } from "@/api/get/get.auth.me";
import LocalStorage from "@/store/localStorage";
import { Button, Text, VStack } from "native-base";
import { useStores } from "@/hooks/useStores";

const schema = yup
  .object({
    email: yup.string().email().required("Input your email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const {
    data: dataLoginV1,
    mutateAsync: loginV1,
    isLoading: isLoadingLoginV1,
  } = usePostLogin({
    onError: (error: Error) => {
      show({ message: error.message, color: ERROR });
    },
  });

  const {
    data: dataLoginV2,
    mutateAsync: loginV2,
    isLoading: isLoadingLoginV2,
  } = usePostLoginV2({
    onError: (error: Error) => {
      show({ message: error.message, color: ERROR });
    },
  });

  const storage = LocalStorage.getInstance();
  const { authStore } = useStores();
  const [trigger, setTrigger] = React.useState(false);
  const [triggerV2, setTriggerV2] = React.useState(false);
  const { data: me, isFetching: isLoadingMe } = useMe({
    enabled: trigger && triggerV2,
  });

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
    await loginV1(payload);
    await loginV2(payload);
  };

  useEffect(() => {
    const onLoginSuccessV1 = async () => {
      if (dataLoginV1?.user) {
        await storage.setItem("email", dataLoginV1?.user?.email);
        await storage.setItem("aToken", dataLoginV1?.user?.aToken);
        await storage.setItem("rToken", dataLoginV1?.user?.rToken);
        setTrigger(true);
        show({ message: "Login success!" });
        authStore.setUser(dataLoginV1?.user);
      }
    };

    const onLoginSuccessV2 = async () => {
      if (dataLoginV2?.user) {
        await storage.setItem("aTokenV2", dataLoginV2?.user?.aToken);
        await storage.setItem("rTokenV2", dataLoginV2?.user?.rToken);
        setTriggerV2(true);
      }
    };

    dataLoginV1 && onLoginSuccessV1();
    dataLoginV2 && onLoginSuccessV2();
  }, [dataLoginV1, dataLoginV2]);

  useEffect(() => {
    if (me) {
      authStore.setUser(me?.user);
    }
  }, [me]);

  if (isLoadingLoginV1 || isLoadingMe || isLoadingLoginV2) {
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
