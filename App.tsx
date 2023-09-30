import AppNavigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "./src/context/toast.context";
import BottomToast from "./src/components/UI/BottomToast";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Provider as MobxProvider } from "mobx-react";
import { DARK_BLUE } from "./src/theme/colors";
import { rootStore } from "./src/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { customFonts } from "@/theme/fonts";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts(customFonts);

  if (!loaded) {
    return null;
  }

  return (
    <MobxProvider {...rootStore}>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ToastProvider>
              <AppNavigation />
              <StatusBar style="dark" backgroundColor={DARK_BLUE} />
              <BottomToast />
            </ToastProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </MobxProvider>
  );
}
