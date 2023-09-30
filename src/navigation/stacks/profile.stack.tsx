import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import ProfileScreen, {
  screenOptions as ProfileScreenOptions,
} from "@/screens/ProfileStack/ProfileScreen";
import { ProfileParamList } from "../ParamList";

const ProfileStackNavigator = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name={routes.profile.value}
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
