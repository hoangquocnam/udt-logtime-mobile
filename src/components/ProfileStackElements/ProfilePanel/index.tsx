import { useStores } from "@/hooks/useStores";
import { hp, wp } from "@/theme";
import { getImageUrl } from "@/utils";
import { observer } from "mobx-react";
import { Box, Image, Text, VStack, HStack, Menu, Pressable } from "native-base";
import React from "react";
import { toCapitalizeFirstLetter } from "@/utils";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { fonts } from "@/theme/fonts";

type ProfilePanelProps = {};

const TOP_HEIGHT = hp(390);
const HEIGHT = TOP_HEIGHT + hp(102);

const ProfilePanel = (props: ProfilePanelProps) => {
  const { authStore } = useStores();
  const { user } = authStore;

  const MenuItem = [
    {
      title: "Logout",
      onPress: () => authStore.logout(),
    },
  ];

  return (
    <VStack position="relative" h={HEIGHT}>
      <VStack
        justifyContent="center"
        alignItems="center"
        space={10}
        bg={"blueGray.800"}
        py={10}
        borderBottomRadius={wp(30)}
        shadow={"9"}
        h={TOP_HEIGHT}
        position="absolute"
        w={"100%"}
        zIndex={1}
      >
        <HStack
          position="relative"
          w="100%"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={wp(20)} color={"white"}>
            Profile
          </Text>
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <TouchableOpacity
                  style={{ position: "absolute", right: 20 }}
                  {...triggerProps}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              );
            }}
          >
            {MenuItem.map((item, index) => (
              <Menu.Item
                key={index}
                onPress={item.onPress}
                _pressed={{
                  bg: "white",
                  opacity: 0.5,
                }}
              >
                <HStack>
                  <MaterialIcons name={"logout"} size={20} />
                  <Text
                    ml={2}
                    color={"black"}
                    fontSize={14}
                    fontWeight={"bold"}
                  >
                    {item.title}
                  </Text>
                </HStack>
              </Menu.Item>
            ))}
          </Menu>
        </HStack>
        <Image
          source={{
            uri: getImageUrl(user?.avatar || ""),
          }}
          size={wp(120)}
          alt={`Avatar ${user?.fullName}`}
          borderRadius={wp(60)}
          borderWidth={1}
          borderColor="gray.300"
        />
        <VStack
          w={"100%"}
          justifyContent="center"
          alignItems="center"
          space={2}
        >
          <Text color={"white"} fontSize={20}>
            {user?.fullName}
          </Text>
          <Text
            color={"white"}
            fontSize={14}
            fontWeight={"500"}
            fontFamily={fonts.light}
          >
            {user?.email}
          </Text>
          <Text
            color={"white"}
            fontSize={14}
            fontWeight={"500"}
            fontFamily={fonts.light}
          >
            {user?.phone}
          </Text>
        </VStack>
      </VStack>

      <HStack
        shadow={"9"}
        alignItems="center"
        bg="white"
        position="absolute"
        justifyContent="center"
        borderBottomRadius={wp(30)}
        bottom={hp(20)}
        minH={HEIGHT}
        w={"100%"}
      >
        <HStack
          alignSelf={"flex-end"}
          justifyContent="space-around"
          flexShrink={1}
          bottom={hp(20)}
        >
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}>
              Role
            </Text>
            <Text fontSize={14} flex={1} fontFamily={fonts.bold}>
              {user?.title?.value}
            </Text>
          </VStack>
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}>
              Partner category
            </Text>
            <Text fontSize={14} fontFamily={fonts.bold} flex={1}>
              {toCapitalizeFirstLetter(user?.partner?.category || "")}
            </Text>
          </VStack>
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}>
              Level
            </Text>
            <Text fontSize={14} flex={1} fontFamily={fonts.bold}>
              {toCapitalizeFirstLetter(user?.level?.value || "")}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default observer(ProfilePanel);
