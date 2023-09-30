import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import routes from "../routes";
import HomeScreen from "@/screens/HomeStack/HomeScreen";
import { BACKGROUND, DARK_BLUE } from "@/theme/colors";
import t from "@/theme";
import { getImageUrl } from "@/utils";
import { useStores } from "@/hooks/useStores";
import { Avatar, HStack, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { MainParamList } from "../ParamList";
import CustomBottomTab from "../UI/BottomTab";
import ProfileNavigator from "./profile.stack";
import FolioNavigator from "./folio.stack";
import { observer } from "mobx-react";

const BottomTabNavigator = createBottomTabNavigator<MainParamList>();

const MainNavigation = () => {
  const { authStore } = useStores();

  const handleLogout = async () => {
    authStore?.logout();
  };

  const HeaderRight = () => {
    return (
      <HStack>
        <TouchableOpacity style={[t.mR5]} onPress={handleLogout}>
          <MaterialIcons name={"logout"} size={20} color={DARK_BLUE} />
        </TouchableOpacity>
      </HStack>
    );
  };

  const HeaderLeft = () => {
    return (
      <HStack marginLeft={4} space={2} alignItems={"center"} flex={1}>
        <Avatar
          size={"sm"}
          source={{ uri: getImageUrl(authStore?.user?.avatar || "") }}
          borderWidth={1}
        />
        <Text ml={2} color={DARK_BLUE} fontSize={13}>
          {"Hi, " + (authStore?.user?.fullName ?? "") + " !"}
        </Text>
      </HStack>
    );
  };

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <BottomTabNavigator.Screen
        name={routes.main.home}
        component={HomeScreen}
        options={{
          headerShown: true,
          headerRight: HeaderRight,
          headerLeft: HeaderLeft,
          headerStyle: {
            height: 100,
            shadowColor: "transparent",
            elevation: 0,
            backgroundColor: BACKGROUND,
          },
          headerTitle: "",
          headerShadowVisible: true,
        }}
      />
      <BottomTabNavigator.Screen
        name={routes.main.folio}
        component={FolioNavigator}
      />
      <BottomTabNavigator.Screen
        name={routes.main.profile}
        component={ProfileNavigator}
      />
    </BottomTabNavigator.Navigator>
  );
};
export default observer(MainNavigation);
