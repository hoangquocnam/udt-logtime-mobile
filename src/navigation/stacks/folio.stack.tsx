import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import FolioScreen, {
  screenOptions as FolioScreenOptions,
} from "@/screens/FolioStack/FolioScreen";
import { AuthParamList } from "../ParamList";

const FolioStackNavigator = createStackNavigator<AuthParamList>();

const FolioNavigation = () => {
  return (
    <FolioStackNavigator.Navigator>
      <FolioStackNavigator.Screen
        name={routes.folio.value}
        component={FolioScreen}
        options={FolioScreenOptions}
      />
    </FolioStackNavigator.Navigator>
  );
};

export default FolioNavigation;
