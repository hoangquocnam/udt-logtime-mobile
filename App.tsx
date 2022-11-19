import AppNavigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { ToastProvider } from "./src/context/toast.context";
import { store } from "./src/redux/store";
import BottomToast from "./src/components/UI/BottomToast";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppNavigation />
        <StatusBar style="auto" />
        <BottomToast />
      </ToastProvider>
    </Provider>
  );
}
