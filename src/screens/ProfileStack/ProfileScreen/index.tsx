import { BACKGROUND, LIGHT_BLUE } from "@/theme/colors";
import { StackNavigationOptions } from "@react-navigation/stack";
import {
  VStack,
  ScrollView,
  Box,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePanel from "@/components/ProfileStackElements/ProfilePanel";

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#1e293b",
      }}
      edges={["top"]}
    >
      <ScrollView flex={1} h={"100%"} bg={BACKGROUND}>
        <VStack
          space={6}
          justifyContent="center"
          divider={<Box h={0.5} bg={LIGHT_BLUE} />}
        >
          <VStack space={5}>
            <ProfilePanel />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
};
