import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import LoginScreen from "@/screens/AuthStack/LoginScreen";
import {
  AuthParamList,
} from "../ParamList";

const AuthStackNavigator = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name={routes.auth.login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigation;
