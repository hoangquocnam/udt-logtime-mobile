import { StyleSheet, Text, View } from "react-native";
import { ProjectDetail } from "../../../interfaces/project";
import { formatCash, formatDecimal } from "../../../utils";
import { useGetReportProject } from "../../../api/report";
import { format } from "date-fns";
import {
  DARK_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
  PRIMARY,
  SUCCESS,
  WARNING,
} from "../../../theme/colors";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import t from "../../../theme";

type Props = { projects: ProjectDetail[]; period: string; date: Date };

const TotalSalaryReport = ({ projects, period, date }: Props) => {
  const { mutateAsync } = useGetReportProject();
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);
  const [isShowSalary, setIsShowSalary] = useState(false);

  const getTotal = async () => {
    const promises = projects.map((project) =>
      mutateAsync({
        project: project?._id,
        period: period,
        date: format(date ?? new Date(), "yyyy-MM-dd"),
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
  }, [projects, period, date]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.itemContainer, styles.timeContainer]}>
        <Text style={[styles.headerText]}>{"Total working time"}</Text>
        <Text style={[styles.valueText, styles.timeText]}>
          {formatDecimal(totalWorkingTime ?? 0)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.itemContainer, styles.priceContainer]}>
        <View>
          <Text style={[styles.headerText]}>{"Total salary"}</Text>
          <Text style={[styles.valueText, styles.priceText]}>
            {isShowSalary ? formatCash(totalSalary ?? 0) : "*****"}
          </Text>
        </View>
        <View style={[t.itemsCenter, t.justifyCenter]}>
          <Ionicons
            name={isShowSalary ? "eye" : "eye-off"}
            size={24}
            onPress={() => setIsShowSalary(!isShowSalary)}
          />
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  priceText: {
    color: SUCCESS,
    fontWeight: "600",
    fontSize: 16,
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
    fontSize: 16,
  },
});
