import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useGetProjects } from "../../api/projects";
import { ProjectDetail } from "../../interfaces/project";
import ProjectListItem from "../../components/HomeStackElements/Home/ProjectListItem";

const SalaryReport = () => {};

function HomeScreen() {
  const {
    data: dataProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetProjects();

  const renderItem: ListRenderItem<ProjectDetail> = ({ item }) => (
    <ProjectListItem item={item} />
  );

  if (isLoadingProjects) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={dataProjects?.projects}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        style={{ flex: 1, height: "100%" }}
      />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  itemContainer: {},
});
