import { FontAwesome5, createIconSetFromIcoMoon, Feather } from "@expo/vector-icons";
import React from "react";
import { SEMI_DARK_BLUE } from "@/theme/colors";

export const Icon = createIconSetFromIcoMoon(
  require("@/assets/icomoon/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

const CustomIcon = (props) => {
  const { name, size, type, color = SEMI_DARK_BLUE, style } = props;

  switch (type) {
    case "fontawesome":
      return (
        <FontAwesome5 name={name} size={size} color={color} style={style} />
      );
    case "feather": 
      return (
        <Feather name={name} size={size} color={color} style={style} />
      );
    default:
      return <Icon name={name} size={size} color={color} style={style} />;
  }
};

export default CustomIcon;
