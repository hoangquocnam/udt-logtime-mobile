import AppNavigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "./src/context/toast.context";
import BottomToast from "./src/components/UI/BottomToast";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";
import { Provider as MobxProvider } from "mobx-react";
import { DARK_BLUE, LIGHT_BLUE, SEMI_DARK_BLUE } from "./src/theme/colors";
import { rootStore } from "./src/store";

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: "Satoshi",
    body: "Satoshi",
    mono: "Satoshi",
    customFont: "Satoshi",
  },
  components: {
    Button: {
      baseStyle: {
        _pressed: {
          opacity: 0.8,
          backgroundColor: "primary.500",
        },
      },
      defaultProps: {
        colorScheme: "primary",
      },
    },
  },
  colors: {
    blue: {
      50: LIGHT_BLUE,
      100: DARK_BLUE,
      200: SEMI_DARK_BLUE,
    },
  },
});

const customFonts = {
  Satoshi: require("./src/assets/fonts/Satoshi-Black.otf"),
  SatoshiBold: require("./src/assets/fonts/Satoshi-Bold.otf"),
  SatoshiLight: require("./src/assets/fonts/Satoshi-Light.otf"),
};

export default function App() {
  const [loaded] = useFonts(customFonts);

  if (!loaded) {
    return null;
  }

  return (
    <MobxProvider {...rootStore}>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AppNavigation />
            <StatusBar style="auto" />
            <BottomToast />
          </ToastProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </MobxProvider>
  );
}
