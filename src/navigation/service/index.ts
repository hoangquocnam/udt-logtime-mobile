import * as React from "react";
import { StackActions } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/routers";

import type { MutableRefObject } from "react";
import type { NavigationContainerRef } from "@react-navigation/native";
import type { RootParamList } from "../ParamList";

export const navigationRef = React.createRef() as MutableRefObject<
  NavigationContainerRef<RootParamList>
>;

export const getCurrentRoute = () => {
  return navigationRef?.current?.getCurrentRoute?.();
};

export const navigate = (name, params, navigation) => {
  if (navigation && navigation?.navigate) {
    navigation.navigate(name, params);
  } else {
    navigationRef.current?.navigate(name, params);
  }
};

export const popToTop = (navigation) => {
  if (navigation && navigation?.popToTop) {
    navigation.popToTop();
  } else {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
};

export const reset = (initialRouteName) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: initialRouteName }],
  });

  navigationRef.current?.dispatch(resetAction);
};

export const dispatch = (action) => {
  navigationRef.current?.dispatch(action);
};

/**
 * Try to go back to the previous screen in the nested stack (if any)
 */
const _tryToNavigateBackToPreviousSubRoute = (navigation) => {
  let success = false;

  // @ts-ignore
  const state = navigation && navigation.dangerouslyGetState();
  if (state) {
    const routes = state.routes;
    if (routes && routes.length > 0) {
      const latestRoute = routes[routes.length - 1];
      if (
        latestRoute.state &&
        latestRoute.state.type === "stack" &&
        latestRoute.state.routes &&
        latestRoute.state.routes.length >= 2
      ) {
        const previousSubRoute =
          latestRoute.state.routes[latestRoute.state.routes.length - 2];
        const backToRoute = { key: previousSubRoute.key };
        navigation
          ? navigation.navigate(backToRoute)
          : navigationRef.current?.navigate(backToRoute);

        success = true;
      }
    }
  }

  return success;
};

export const goBack = (navigation) => {
  if (_tryToNavigateBackToPreviousSubRoute(navigation)) {
    return;
  }

  if (navigation && navigation?.goBack) {
    navigation.goBack();
  } else {
    navigationRef.current?.goBack();
  }
};

export const pop = (navigation) => {
  if (_tryToNavigateBackToPreviousSubRoute(navigation)) {
    return;
  }

  if (navigation && navigation?.pop) {
    navigation.pop();
  } else {
    navigationRef.current?.dispatch(StackActions.pop());
  }
};
export const push = (name, params, navigation) => {
  if (navigation && navigation?.push) {
    navigation.push(name, params);
  } else {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
};

export default {
  getCurrentRoute,
  navigate,
  popToTop,
  reset,
  dispatch,
  goBack,
  pop,
  push,
};
