import {
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from "react-native";
import t from "../../../theme";
import React, { useEffect, useRef, useContext } from "react";
import { ToastContext } from "../../../context/toast.context";
import { ERROR } from "../../../theme/colors";

const PopOutTime = 2 * 100;
const AutoDuration = 300;
const BOTTOM_POSITION = Dimensions.get("window").height;

export default function BottomToast() {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const bottomPosition = BOTTOM_POSITION;
  const popInAnimation = useRef(new Animated.Value(bottomPosition));
  const { toast, hide } = useContext(ToastContext);

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(popInAnimation.current, {
        duration: AutoDuration,
        easing: Easing.ease,
        toValue: bottomPosition * 0.85,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(popInAnimation.current, {
        duration: PopOutTime,
        easing: Easing.ease,
        toValue: bottomPosition,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        t.selfCenter,
        {
          borderRadius: 4,
          marginHorizontal: 16,
          position: "absolute",
          top: 0,
          zIndex: 2,
          right: 0,
          left: 0,
          transform: [{ translateY: popInAnimation.current }],
        },
      ]}
    >
      <AnimatedTouchable
        onPress={hide}
        style={[
          t.opacity80,
          t.rounded,
          t.flexRow,
          t.justifyCenter,
          t.minW96,
          t.selfCenter,
          t.absolute,
          t.flexShrink1,
          t.pY5,
          t.pX8,
          {
            maxWidth: "100%",
            backgroundColor: toast?.color || ERROR,
          },
        ]}
      >
        <Text
          style={[t.textWhite, t.textBase, t.mX4, t.selfCenter]}
          adjustsFontSizeToFit={true}
        >
          {toast.message}
        </Text>
      </AnimatedTouchable>
    </Animated.View>
  );
}
