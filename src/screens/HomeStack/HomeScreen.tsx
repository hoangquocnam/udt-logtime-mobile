import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useGetProjects } from "../../api/projects";
import { ProjectDetail } from "../../interfaces/project";
import ProjectListItem from "../../components/HomeStackElements/Home/ProjectListItem";
import TotalSalaryReport from "../../components/HomeStackElements/Home/TotalSalaryReport";
import t from "../../theme";

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
    return <View style={[t.h5]} />;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.itemContainer}>
          <Text style={[{ fontSize: 20, fontWeight: "bold" }, t.mB2]}>
            Total report
          </Text>
          <TotalSalaryReport projects={dataProjects?.projects} />
        </View>

        <View style={[t.h0_5, t.bgGray400, t.mY8]} />

        <View>
          <Text style={[{ fontSize: 20, fontWeight: "bold" }, t.mB2]}>
            Projects
          </Text>
          <FlatList<ProjectDetail>
            data={dataProjects?.projects}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            style={{ flex: 1, height: "100%" }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  itemContainer: {
    justifyContent: "space-around",
  },
});
