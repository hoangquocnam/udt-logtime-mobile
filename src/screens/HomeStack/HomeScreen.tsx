import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useGetProjects } from "@/api/projects";
import { ProjectDetail } from "@/interfaces/project";
import ProjectListItem from "@/components/HomeStackElements/Home/ProjectListItem";
import TotalSalaryReport from "@/components/HomeStackElements/Home/TotalSalaryReport";
import t from "@/theme";
import PeriodSelector, {
  EPeriods,
} from "@/components/HomeStackElements/Home/PeriodSelector";
import { Box, Text, ScrollView, FlatList, VStack, HStack } from "native-base";
import { BACKGROUND, LIGHT_BLUE, SEMI_DARK_BLUE } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { RootParamListNavigationProps } from "@/navigation/ParamList";
import routes from "@/navigation/routes";

function HomeScreen() {
  const { data: dataProjects, isLoading: isLoadingProjects } = useGetProjects();
  const [currentPeriod, setCurrentPeriod] = useState(EPeriods.MONTH);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation<RootParamListNavigationProps>();

  const isLoading = useMemo(() => {
    return isLoadingProjects;
  }, [isLoadingProjects]);

  const renderItem: ListRenderItem<ProjectDetail> = ({ item }) => (
    <ProjectListItem item={item} period={currentPeriod} date={selectedDate} />
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
    setCurrentPeriod(period as EPeriods);
  };

  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
  };

  const goToProjectList = () => {
    navigation.navigate(routes.root.project);
  };

  return (
    <Box style={styles.container} backgroundColor={BACKGROUND}>
      <Box
        style={[styles.itemContainer]}
        backgroundColor={BACKGROUND}
        p={5}
        borderBottomWidth={1}
        borderBottomColor={LIGHT_BLUE}
      >
        <PeriodSelector
          onChange={onChangePeriod}
          onChangeDate={onChangeDate}
          date={selectedDate}
        />
      </Box>

      <ScrollView backgroundColor={BACKGROUND} py={2}>
        <Box px={5}>
          <View style={styles.itemContainer}>
            <TotalSalaryReport
              projects={dataProjects?.projects || []}
              period={currentPeriod}
              date={selectedDate}
            />
          </View>

          <View style={[t.h0_5, t.bgGray400, t.mY8]} />

          <VStack style={[t.mB5, styles.itemContainer]} space={3}>
            <HStack
              w="100%"
              alignItems={"baseline"}
              justifyContent="space-between"
            >
              <Text style={[{ fontSize: 20, fontWeight: "bold" }, t.mB2]}>
                Projects
              </Text>

              <Text onPress={goToProjectList}>See all</Text>
            </HStack>
            <FlatList<ProjectDetail>
              data={dataProjects?.projects}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
              style={{ flex: 1, height: "100%" }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
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
