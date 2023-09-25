import { useDashBoard } from "@/api/folio/get.folio.dashboard";
import { getValidArray } from "@/utils";
import React, { useMemo, useState } from "react";
import { DARK_BLUE, YELLOW } from "@/theme/colors";
import { EPeriods } from "@/components/HomeStackElements/Home/PeriodSelector";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { EChartType } from "@/enums";

const useViewModel = () => {
  const [period, setPeriod] = React.useState(EPeriods.MONTH);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: dataDashBoard } = useDashBoard(period, selectedDate);

  const [performanceType, setPerformanceType] = useState(EChartType.TIME);

  const chartPerformanceData: ChartData | null = useMemo(() => {
    if (!dataDashBoard || !(performanceType === EChartType.TIME)) return null;
    const performances = dataDashBoard?.performanceLineData || [];
    const totalPerformance = getValidArray(performances).find(
      (pf) => pf?.id === "all"
    );

    const totalLabels =
      totalPerformance?.data?.map((item) => item?.x || "") || [];
    const totalData = totalPerformance?.data?.map((item) => item?.y || 0) || [];

    const othersPerformance = getValidArray(performances).filter(
      (pf) => pf?.id !== "all"
    );

    const othersData = othersPerformance.map((pf) => {
      return {
        color: () => pf?.color || DARK_BLUE,
        data: pf?.data?.map((item) => item?.y || 0) || [],
      };
    });

    const legends = [
      totalPerformance?.name || "",
      ...othersPerformance.map((pf) => pf?.name || ""),
    ];

    return {
      labels: totalLabels,
      datasets: [
        {
          data: totalData,
          color: () => YELLOW,
        },
        ...othersData,
      ],
      legend: legends,
    };
  }, [dataDashBoard, performanceType]);

  const onChangePeriod = (period: string) => {
    setPeriod(period as EPeriods);
  };

  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
  };

  return {
    chartPerformanceData,
    performanceType,
    setPerformanceType,
    selectedDate,
    onChangePeriod,
    onChangeDate,
  };
};

export default useViewModel;
