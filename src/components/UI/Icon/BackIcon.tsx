import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Box } from "native-base";

export default function BackIcon() {
  return (
    <Box h={50}>
      <Entypo
        style={styles.backIcon}
        name={"chevron-left"}
        size={30}
        color={"black"}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  backIcon: { marginLeft: 12 },
});
