import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import Router from "./router";
import LoginScreen from "../screens/AuthStack/LoginScreen";
import HomeScreen from "../screens/HomeStack/HomeScreen";
import { PRIMARY } from "../theme/colors";
import t from "../theme";
import FavoriteScreen from "../screens/HomeStack/FavoriteScreen";

const AppStackNavigator = createStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();

const MainNavigation = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate(Router.Login);
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
          headerTitle: () => {
            return (
              <Text
                style={[
                  t.fontSansBold,
                  t.alignCenter,
                  {
                    fontSize: 20,
                    color: PRIMARY
                  },
                ]}
              >
                {route.name}
              </Text>
            );
          },
          tabBarIcon: ({ size, focused, color }) => {
            switch (route.name) {
              case Router.Main.Home:
                return <AntDesign name="home" size={size} color={color} />;
              case Router.Main.Favorites:
                return (
                  <MaterialIcons
                    name="favorite-border"
                    size={size}
                    color={color}
                  />
                );
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
        name={Router.Main.Home}
        component={HomeScreen}
      />
      <BottomTabNavigator.Screen
        name={Router.Main.Favorites}
        component={FavoriteScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

const AppNavigation = () => {
  const defaultNavOptions = {
    headerTitleStyle: {
      color: "#000",
    },
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AppStackNavigator.Screen name={Router.Login} component={LoginScreen} />
        <AppStackNavigator.Screen
          name={Router.Main.value}
          component={MainNavigation}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
