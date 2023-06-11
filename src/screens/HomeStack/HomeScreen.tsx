import React, { useMemo, useState } from "react";
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
import PeriodSelector from "../../components/HomeStackElements/Home/PeriodSelector";

function HomeScreen() {
  const { data: dataProjects, isLoading: isLoadingProjects } = useGetProjects();
  const [currentPeriod, setCurrentPeriod] = useState("month");

  const isLoading = useMemo(() => {
    return isLoadingProjects;
  }, [isLoadingProjects]);

  const renderItem: ListRenderItem<ProjectDetail> = ({ item }) => (
    <ProjectListItem item={item} period={currentPeriod} />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  const ItemSeparator = () => {
    return <View style={[t.h5]} />;
  };

  const onChangePeriod = (period: string) => {
    setCurrentPeriod(period);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.itemContainer, t.mB4]}>
        <PeriodSelector onChange={onChangePeriod} />
      </View>

      <ScrollView style={styles.container}>
        <View>
          <View style={styles.itemContainer}>
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, t.mB2]}>
              Total report
            </Text>
            <TotalSalaryReport
              projects={dataProjects?.projects}
              period={currentPeriod}
            />
          </View>

          <View style={[t.h0_5, t.bgGray400, t.mY8]} />

          <View style={[t.mB5, styles.itemContainer]}>
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
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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