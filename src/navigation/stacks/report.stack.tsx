import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import routes from "../routes";
import { ReportParamList } from "../ParamList";
import CreateReportScreen, {
  screenOptions as CreateReportScreenOptions,
} from "@/screens/ReportStack/CreateReportScreen";
import { BACKGROUND } from "@/theme/colors";
import BackIcon from "@/components/UI/Icon/BackIcon";

const ReportStackNavigator = createStackNavigator<ReportParamList>();

const ReportNavigator = () => {
  const defaultNavOptions: StackNavigationOptions = {
    title: "",
    headerBackTitle: "",
    headerShown: true,
    headerStyle: {
      backgroundColor: BACKGROUND,
      elevation: 0,
      borderBottomWidth: 0,
      shadowColor: "transparent",
    },
    headerBackImage: () => <BackIcon />,
  };

  return (
    <ReportStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ReportStackNavigator.Screen
        name={routes.report.create}
        component={CreateReportScreen}
        options={CreateReportScreenOptions}
      />
    </ReportStackNavigator.Navigator>
  );
};

export default ReportNavigator;
