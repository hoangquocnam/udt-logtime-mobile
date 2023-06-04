import { Entypo } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginForm from "../../../components/AuthScreenElements/LoginForm";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 33,
    paddingHorizontal: 22,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 22,
    fontWeight: "bold",
  },
});

export const screenOptions = (navData) => {
  return {
    title: "",
    headerShown: true,
    headerStyle: {
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Entypo
        style={{ marginLeft: 22 }}
        name={"chevron-left"}
        size={22}
        color={"#000"}
      />
    ),
  };
};

export default LoginScreen;
