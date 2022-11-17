import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";

const AppStackNavigator = createStackNavigator();

const AppNavigation = () => {
  const defaultNavOptions = {
    headerTitleStyle: {
      color: "#000",
    },
    // below code to hide title and give screen a full height
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AppStackNavigator.Screen name="Login" component={LoginScreen} />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
