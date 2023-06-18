import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import appRoutes from "../routes";
import { Observer, observer } from "mobx-react";
import { useMemo } from "react"
import ProjectList from "@/screens/ProjectsStack/list";
import { ProjectParamList, RootParamList } from "../ParamList";
const ProjectStackNavigator = createStackNavigator<ProjectParamList>();

const ProjectNavigation = () => {
  return (
    <ProjectStackNavigator.Navigator>
      <ProjectStackNavigator.Screen
        name={appRoutes.project.list}
        component={ProjectList}
        options={{ headerShown: false }}
      />
    </ProjectStackNavigator.Navigator>
  );
};

export default ProjectNavigation;