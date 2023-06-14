import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import appRoutes from "./routes";
import LoginScreen from "../screens/AuthStack/LoginScreen";
import HomeScreen from "../screens/HomeStack/HomeScreen";
import { PRIMARY } from "../theme/colors";
import t from "../theme";
import { Observer } from "mobx-react";

const AppStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();

const MainNavigation = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    navigation.navigate(appRoutes.Auth.value);
  };

  return (
    <BottomTabNavigator.Navigator
      screenOptions={({ route }) => {
        return {
          headerRight: () => {
            return (
              <TouchableOpacity style={[t.mR5]} onPress={handleLogout}>
                <MaterialIcons name={"logout"} size={20} color={PRIMARY} />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ size, focused, color }) => {
            switch (route.name) {
              case appRoutes.Home.value:
                return <AntDesign name="home" size={size} color={color} />;

              default:
                return <Ionicons name="ios-home" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: PRIMARY,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
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

  const screensToUse = () => {
    return (
      <>
        <AppStackNavigator.Screen
          name={appRoutes.Main.value}
          component={MainNavigation}
        />
        <AppStackNavigator.Screen
          name={appRoutes.Auth.value}
          component={AuthNavigation}
        />
      </>
    );
  };

  return (
    <Observer>
      {() => (
        <NavigationContainer>
          <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
            {screensToUse()}
          </AppStackNavigator.Navigator>
        </NavigationContainer>
      )}
    </Observer>
  );
};

export default AppNavigation;
