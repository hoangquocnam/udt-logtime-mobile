import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProjectDetail } from "../../../interfaces/project";
import { getImageUrl } from "../../../utils";
import { useGetReportProject } from "../../../api/report";

const ProjectListItem = ({ item }: { item: ProjectDetail }) => {
  // const { data, error } = useGetReportProject({
  //   project: item?._id,
  //   period: "month",
  //   date: "2023-06-09",
  // });

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer]}>
        <Image
          source={{ uri: getImageUrl(item?.logo) }}
          style={[styles.logoStyle]}
        />
      </View>

      <View style={[styles?.listContainer]}>
        <View style={styles.itemContainer}>
          <Text style={[styles.headerText]}>{"ID:"}</Text>
          <Text style={styles.valueText}>{item?._id}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={[styles.headerText]}>{"Name:"}</Text>
          <Text style={styles.valueText}>{item?.name}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={[styles.headerText]}>{"Payment period"}</Text>
          <Text style={styles.valueText}>{item?.paymentPeriod}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  valueText: {},
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  listContainer: {
    justifyContent: "space-between",
  },

  reportContainer: {},
});

export default ProjectListItem;
