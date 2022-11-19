import AppNavigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
