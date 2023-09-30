import { useStores } from "@/hooks/useStores";
import { IUserRefreshToken } from "@/interfaces/user";
import { hp, wp } from "@/theme";
import { getImageUrl } from "@/utils";
import { observer } from "mobx-react";
import { Box, Image, Text, VStack, HStack } from "native-base";
import React from "react";
import { toCapitalizeFirstLetter } from "@/utils";

type ProfilePanelProps = {};
const TOP_HEIGHT = hp(370);
const HEIGHT = hp(370) + hp(102);

const ProfilePanel = (props: ProfilePanelProps) => {
  const { authStore } = useStores();

  const { user } = authStore;

  console.log(user)

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
        <Text fontSize={wp(20)} color={"white"}>
          Profile
        </Text>
        <Image
          source={{
            uri: getImageUrl(user?.avatar || ""),
          }}
          size={wp(120)}
          alt={`Avatar ${user?.fullName}`}
          borderRadius={wp(60)}
        />
        <Box w={"100%"} justifyContent="center" alignItems="center">
          <Text color={"white"} fontSize={20}>
            {user?.fullName}
          </Text>
          <Text color={"white"} fontSize={14} fontWeight={"500"}>
            {user?.email}
          </Text>
        </Box>
      </VStack>

      <HStack
        shadow={"9"}
        alignItems="center"
        bg="white"
        position="absolute"
        borderBottomRadius={wp(30)}
        bottom={hp(20)}
        minH={HEIGHT}
        w={"100%"}
      >
        <HStack
          py={"30"}
          alignSelf={"flex-end"}
          justifyContent="space-around"
          flexShrink={1}
        >
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}
              fontFamily={"Satoshi-Light"}
            >
              Role
            </Text>
            <Text fontSize={14} fontWeight={"500"} flex={1}>
              {user?.title?.value}
            </Text>
          </VStack>
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}>
              Partner category
            </Text>
            <Text fontSize={14} fontWeight={"500"} flex={1}>
              {toCapitalizeFirstLetter(user?.partner?.category || "")}
            </Text>
          </VStack>
          <VStack alignItems="center" flex={1} flexShrink={1}>
            <Text fontSize={12} fontWeight={"500"} flex={1}>
              Default rate
            </Text>
            <Text fontSize={14} flex={1} fontWeight={"light"}>
              {user?.defaultRating}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default observer(ProfilePanel);
