import AppNavigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "./src/context/toast.context";
import BottomToast from "./src/components/UI/BottomToast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AppNavigation />
        <StatusBar style="auto" />
        <BottomToast />
      </ToastProvider>
    </QueryClientProvider>
  );
}
