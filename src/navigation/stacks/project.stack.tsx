import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import ProjectListScreen from "@/screens/ProjectsStack/ProjectListScreen";
import { ProjectParamList } from "../ParamList";
import ProjectDetailScreen, {
  screenOptions as ProjectDetailScreenOptions,
} from "@/screens/ProjectsStack/ProjectDetailScreen";

const ProjectStackNavigator = createStackNavigator<ProjectParamList>();

const ProjectNavigation = () => {
  return (
    <ProjectStackNavigator.Navigator>
      <ProjectStackNavigator.Screen
        name={routes.project.list}
        component={ProjectListScreen}
        options={{ headerShown: true }}
      />
      <ProjectStackNavigator.Screen
        // @ts-ignore
        name={routes.project.detail}
        component={ProjectDetailScreen}
        options={{...ProjectDetailScreenOptions,
          headerBackTitleVisible: false,
        }}
      />
    </ProjectStackNavigator.Navigator>
  );
};

export default ProjectNavigation;
