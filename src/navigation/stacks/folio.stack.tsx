import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import { FolioParamList } from "../ParamList";
import FolioScreen, {
  screenOptions as FolioScreenOptions,
} from "@/screens/FolioStack/FolioScreen";

const FolioStackNavigator = createStackNavigator<FolioParamList>();

const FolioNavigator = () => {
  return (
    <FolioStackNavigator.Navigator>
      <FolioStackNavigator.Screen
        name={routes.profile.value}
        component={FolioScreen}
        options={FolioScreenOptions}
      />
    </FolioStackNavigator.Navigator>
  );
};

export default FolioNavigator;
