import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import appRoutes from "../routes";
import HomeScreen from "@/screens/HomeStack/HomeScreen";
import { DARK_BLUE } from "@/theme/colors";
import t from "@/theme";
import LocalStorage from "@/store/localStorage";
import { getImageUrl } from "@/utils";
import { useStores } from "@/hooks/useStores";
import { Avatar, HStack, VStack, Text } from "native-base";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { MainParamList } from "../ParamList";

const BottomTabNavigator = createBottomTabNavigator<MainParamList>();

const MainNavigation = () => {
  const navigation = useNavigation<any>();
  const storage = LocalStorage.getInstance();
  const { authStore } = useStores();

  const handleLogout = async () => {
    await storage.clear();
    authStore.setUser(null);
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
          {"Hi, " + authStore?.user?.fullName ?? "" + "!"}
        </Text>
      </HStack>
    );
  };

  return (
    <BottomTabNavigator.Navigator
      screenOptions={({ route }) => {
        return {
          headerRight: HeaderRight,
          headerLeft: HeaderLeft,
          tabBarIcon: ({ size, focused, color }) => {
            switch (route.name) {
              case appRoutes.main.home:
                return <AntDesign name="home" size={size} color={color} />;

              default:
                return <Ionicons name="ios-home" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: DARK_BLUE,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          headerStyle: {
            height: 100,
            shadowColor: "#000",
          },
          headerTitle: "",
          headerShadowVisible: true,
        };
      }}
    >
      <BottomTabNavigator.Screen
        name={appRoutes.main.home}
        component={HomeScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};
export default MainNavigation;
