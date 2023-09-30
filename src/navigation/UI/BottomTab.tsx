import React from "react";

import { Text, VStack, HStack, Pressable } from "native-base";
import NavigationService from "../service";
import { SvgProps } from "react-native-svg";
import CustomIcon from "@/components/UI/Icon";
import routes from "../routes";

const SCREENS_WITHOUT_BOTTOM_TAB: string[] = [];

const CustomBottomTab = ({ state, descriptors, navigation }) => {
  const currentRoute = NavigationService.getCurrentRoute();
  if (SCREENS_WITHOUT_BOTTOM_TAB.includes(currentRoute?.name ?? "")) {
    return null;
  }
  return (
    <HStack
      bg={"#1E2B3E"}
      w="100%"
      justifyContent="space-between"
      px={53}
      alignItems={"center"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name });
          }
        };

        let iconName;
        let iconType = "custom";
        let label;
        switch (route.name) {
          case routes.main.home:
            iconType = "feather";
            iconName = "home";
            label = "Home";
            break;
          case routes.main.folio:
            iconType = "entypo";
            iconName = "line-graph";
            label = "Folio";
            break;
          case routes.main.profile:
            iconType = "feather";
            iconName = "user";
            label = "Profile";
            break;
          default:
            break;
        }

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
          >
            <VStack
              alignItems="center"
              justifyContent="center"
              bg="red"
              height={90}
            >
              <CustomIcon
                name={iconName}
                color={isFocused ? "#FFCD1C" : "white"}
                size={25}
                type={iconType}
              />
              <Text fontSize={12} color={isFocused ? "#FFCD1C" : "white"}>
                {label}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default CustomBottomTab;
