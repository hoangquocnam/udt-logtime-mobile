import { PRIMARY } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  return StyleSheet.create({
    tabbarMenuButton: {
      flex: 1,
      height: 103,
      alignItems: "center",
      paddingTop: 18.38,
      backgroundColor: PRIMARY,
    },
  });
};
