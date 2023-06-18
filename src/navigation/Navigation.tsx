import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import appRoutes from "./routes";
import { Observer, observer } from "mobx-react";
import { useMemo } from "react";
import { useStores } from "../hooks/useStores";
import { RootParamList } from "./ParamList";
import MainNavigation from "./stacks/main";
import AuthNavigation from "./stacks/auth";
import ProjectNavigation from "./stacks/project";

const AppStackNavigator = createStackNavigator<RootParamList>();

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
          name={appRoutes.root.auth}
          component={AuthNavigation}
        />
      );
    }
    return (
      <>
        <AppStackNavigator.Screen
          name={appRoutes.root.main}
          component={MainNavigation}
        />
        <AppStackNavigator.Screen
          name={appRoutes.root.project}
          component={ProjectNavigation}
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
