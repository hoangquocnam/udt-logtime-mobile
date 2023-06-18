import { createStackNavigator } from "@react-navigation/stack";
import routes from "../routes";
import ProjectListScreen from "@/screens/ProjectsStack/ProjectListScreen";
import { ProjectParamList } from "../ParamList";

const ProjectStackNavigator = createStackNavigator<ProjectParamList>();

const ProjectNavigation = () => {
  return (
    <ProjectStackNavigator.Navigator>
      <ProjectStackNavigator.Screen
        name={routes.project.list}
        component={ProjectListScreen}
        options={{ headerShown: true }}
      />
    </ProjectStackNavigator.Navigator>
  );
};

export default ProjectNavigation;
