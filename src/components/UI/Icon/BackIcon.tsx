import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "native-base";
import { navigationRef } from "@/navigation/service";

export default function BackIcon({
  color,
  onPress,
}: {
  color?: string;
  onPress?: () => void;
}) {
  const handleOnPress = () => {
    onPress
      ? onPress()
      : (() => {
          navigationRef.current?.goBack();
        })();
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Entypo
        style={styles.backIcon}
        name={"chevron-left"}
        size={30}
        color={color ?? "black"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backIcon: { },
});
