import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import appRoutes from "./routes";
import LoginScreen from "../screens/AuthStack/LoginScreen";
import HomeScreen from "../screens/HomeStack/HomeScreen";
import { BACKGROUND, DARK_BLUE } from "../theme/colors";
import t from "../theme";
import { Observer, observer } from "mobx-react";
import LocalStorage from "../store/localStorage";
import { Avatar, HStack, VStack, Text } from "native-base";
import { useMe } from "../api/auth";
import { getImageUrl } from "../utils";
import { useMemo } from "react";
import { useStores } from "../hooks/useStores";

const AppStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();

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
          source={{ uri: getImageUrl(authStore?.user?.avatar) }}
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
              case appRoutes.Home.value:
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
        name={appRoutes.Home.value}
        component={HomeScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

const AuthNavigation = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name={appRoutes.Auth.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

const AppNavigation = () => {
  const defaultNavOptions = {
    headerTitleStyle: {
      color: "#000",
    },
    headerShown: false,
  };

  const { authStore } = useStores();

  const screensToUse = useMemo(() => {
    if (!authStore?.user) {
      return (
        <AppStackNavigator.Screen
          name={appRoutes.Auth.value}
          component={AuthNavigation}
        />
      );
    }
    return (
      <>
        <AppStackNavigator.Screen
          name={appRoutes.Main.value}
          component={MainNavigation}
        />
      </>
    );
  }, [authStore?.user]);

  return (
    <Observer>
      {() => (
        <NavigationContainer>
          <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
            {screensToUse}
          </AppStackNavigator.Navigator>
        </NavigationContainer>
      )}
    </Observer>
  );
};

export default observer(AppNavigation);
