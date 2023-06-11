import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProjectDetail } from "../../../interfaces/project";
import { formatCash, getImageUrl } from "../../../utils";
import { useGetReportProject } from "../../../api/report";
import { format } from "date-fns";
import {
  DARK_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
  SUCCESS,
  WARNING,
} from "../../../theme/colors";
import { useEffect, useMemo, useState } from "react";

const TotalSalaryReport = ({ projects }: { projects: ProjectDetail[] }) => {
  const { mutateAsync } = useGetReportProject();
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);

  const getTotal = async () => {
    const promises = projects.map((project) =>
      mutateAsync({
        project: project?._id,
        period: "month",
        date: format(new Date(), "yyyy-MM-dd"),
      })
    );
    const results = await Promise.all(promises);

    const total = results.reduce((acc, result) => {
      return acc + result?.reportDetail?.totalSalary;
    }, 0);

    const totalWorkingTime = results.reduce((acc, result) => {
      return acc + result?.reportDetail?.totalWorkingTime;
    }, 0);

    return {
      total,
      totalWorkingTime,
    };
  };

  useEffect(() => {
    getTotal().then(({ total, totalWorkingTime }) => {
      setTotalSalary(total);
      setTotalWorkingTime(totalWorkingTime);
    });
  }, [projects]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.itemContainer, styles.timeContainer]}>
        <Text style={[styles.headerText]}>{"Total working time"}</Text>
        <Text style={[styles.valueText, styles.timeText]}>
          {totalWorkingTime ?? 0}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.itemContainer, styles.priceContainer]}>
        <Text style={[styles.headerText]}>{"Total salary"}</Text>
        <Text style={[styles.valueText, styles.priceText]}>
          {formatCash(totalSalary ?? 0)}
        </Text>
      </View>
    </View>
  );
};

export default TotalSalaryReport;

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
  priceContainer: {
    backgroundColor: LIGHT_GREEN,
    padding: 10,
    borderRadius: 10,
  },
  priceText: {
    color: SUCCESS,
    fontWeight: "600",
    fontSize: 18,
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
    fontSize: 18,
  },
});
