import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { Observer, observer } from "mobx-react";
import { useCallback, useEffect, useMemo } from "react";
import { useStores } from "../hooks/useStores";
import { RootParamList } from "./ParamList";
import MainNavigation from "./stacks/main.stack";
import AuthNavigation from "./stacks/auth.stack";
import ProjectNavigation from "./stacks/project.stack";
import { useProfile } from "@/api/get/get.profile";
import ReportNavigator from "./stacks/report.stack";
import AuthStore from "@/store/authStore";
import { navigationRef } from "./service";

const AppStackNavigator = createStackNavigator<RootParamList>();

const AppNavigation = () => {
  const defaultNavOptions = {
    headerTitleStyle: {
      color: "#000",
    },
    headerShown: false,
  };
  const { authStore } = useStores();
  const { data: dataMe } = useProfile({
    enabled: !!authStore?.user?.id,
  });

  useEffect(() => {
    if (dataMe) {
      // @ts-ignore
      authStore.setUser({
        ...authStore.user,
        ...dataMe,
      });
    }
  }, [dataMe]);

  const screensToUse = useCallback(
    (authStore: AuthStore) => {
      if (!authStore?.user) {
        return (
          <AppStackNavigator.Screen
            name={routes.root.auth}
            component={AuthNavigation}
          />
        );
      }
      return (
        <>
          <AppStackNavigator.Screen
            name={routes.root.main}
            component={MainNavigation}
          />
          <AppStackNavigator.Screen
            name={routes.root.project}
            component={ProjectNavigation}
          />
          <AppStackNavigator.Screen
            name={routes.root.report}
            component={ReportNavigator}
          />
        </>
      );
    },
    [authStore?.user]
  );

  return (
    <Observer>
      {() => (
        <NavigationContainer ref={navigationRef}>
          <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
            {screensToUse(authStore)}
          </AppStackNavigator.Navigator>
        </NavigationContainer>
      )}
    </Observer>
  );
};

export default observer(AppNavigation);
