import { useDashBoard } from "@/api/folio/get.folio.dashboard";
import { EDateBarType } from "@/components/UI/DateBar";
import React from "react";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

const useViewModel = () => {
  const [period, setPeriod] = React.useState(EDateBarType.MONTH);
  const { data: dataDashBoard, error: errorDashBoard } = useDashBoard(period);

  const chartData: LineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  return {
    chartData,
    period,
    setPeriod,
  };
};

export default useViewModel;
