import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetProjects } from "../../api/report-timesheet";
import { ProjectDetail } from "../../interfaces/project";
import ProjectListItem from "../../components/HomeStackElements/Home/ProjectListItem";

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
