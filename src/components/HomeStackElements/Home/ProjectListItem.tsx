import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProjectDetail } from "../../../interfaces/project";
import { formatCash, getImageUrl, formatDecimal } from "../../../utils";
import { useGetReportProject } from "../../../api/report";
import { format } from "date-fns";
import {
  DARK_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
  SUCCESS,
  WARNING,
} from "../../../theme/colors";

type Props = { item: ProjectDetail; period: string; date: Date };

const ProjectListItem = ({ item, period, date }: Props) => {
  const { mutateAsync, data: dataReportProject } = useGetReportProject();

  useEffect(() => {
    mutateAsync({
      project: item?._id,
      period: period,
      date: format(date ?? new Date(), "yyyy-MM-dd"),
    });
  }, [item, period, date]);

  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
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

          <View style={styles.divider} />

          <View style={[styles.itemContainer, styles.timeContainer]}>
            <Text style={[styles.headerText]}>{"Total working time"}</Text>
            <Text style={[styles.valueText, styles.timeText]}>
              {formatDecimal(
                dataReportProject?.reportDetail?.totalWorkingTime ?? 0
              )}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.itemContainer, styles.priceContainer]}>
            <Text style={[styles.headerText]}>{"Total salary"}</Text>
            <Text style={[styles.valueText, styles.priceText]}>
              {formatCash(dataReportProject?.reportDetail?.totalSalary ?? 0)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: DARK_GRAY,
  },
  itemContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 15,
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
  priceContainer: {
    backgroundColor: LIGHT_GREEN,
    padding: 10,
    borderRadius: 10,
  },
  priceText: {
    color: SUCCESS,
    fontWeight: "600",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: DARK_GRAY,
    width: "100%",
    marginVertical: 10,
  },
  timeContainer: {
    backgroundColor: LIGHT_YELLOW,
    padding: 10,
    borderRadius: 10,
  },
  timeText: {
    color: WARNING,
    fontWeight: "600",
    fontSize: 15,
  },
});

export default ProjectListItem;
