import { StyleSheet } from "react-native";
import { ProjectDetail } from "@/interfaces/project";
import { formatCash, formatDecimal } from "@/utils";
import { useGetReportProject } from "@/api/report";
import { format } from "date-fns";
import { DARK_BLUE, SEMI_DARK_BLUE, SUCCESS, WARNING } from "@/theme/colors";
import { useEffect, useState } from "react";
import { Box, Button, HStack, Spinner, Stack, Text, VStack } from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";

type Props = {
  projects: ProjectDetail[];
  period: string;
  date: Date;
  isRefresh?: boolean;
};

const TotalSalaryReport = ({ projects, period, date, isRefresh }: Props) => {
  const { mutateAsync, isLoading } = useGetReportProject();
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);
  const [isShowSalary, setIsShowSalary] = useState(true);

  const getTotal = async () => {
    const promises = projects?.map((project) =>
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
  }, [projects, period, date, isRefresh]);

  return (
    <VStack
      style={[styles.container]}
      alignItems={"center"}
      minH={"250px"}
      justifyContent={"center"}
      space={3}
    >
      <Box>
        <Text fontWeight={"500"} fontSize={18} color={SEMI_DARK_BLUE}>
          Monitor
        </Text>
      </Box>

      {isLoading ? (
        <Stack>
          <Spinner color={DARK_BLUE} />
        </Stack>
      ) : (
        <>
          <Box alignItems={"center"}>
            <Text
              fontWeight={"600"}
              fontSize={36}
              color={DARK_BLUE}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {isShowSalary ? formatCash(totalSalary * 0.9 ?? 0) : "*********"}
            </Text>

            <Text
              fontWeight={"400"}
              color={SEMI_DARK_BLUE}
              numberOfLines={1}
              textDecoration={"underline"}
              mb={5}
              adjustsFontSizeToFit={true}
            >
              {isShowSalary ? formatCash(totalSalary ?? 0) : "*****"}
            </Text>

            <Text fontWeight={"600"} fontSize={24} color={SEMI_DARK_BLUE}>
              {formatDecimal(totalWorkingTime ?? 0) + " h"}
            </Text>
          </Box>

          <HStack
            space={5}
            alignItems={"center"}
            justifyContent={"center"}
            mt={3}
          >
            <Button
              bg={DARK_BLUE}
              flex={1}
              borderRadius={14}
              flexDir={"row"}
              onPress={() => {}}
            >
              <HStack space={4} flex={1} py={3} alignItems={"center"}>
                <Text color={"white"} fontSize={16} fontWeight={"600"}>
                  Add
                </Text>
                <Feather name="plus-square" size={24} color={"white"} />
              </HStack>
            </Button>

            <Button
              bg={"white"}
              flex={1}
              borderRadius={14}
              flexDir={"row"}
              onPress={() => {
                setIsShowSalary(!isShowSalary);
              }}
            >
              <HStack space={4} flex={1} py={3} alignItems={"center"}>
                <Text color={DARK_BLUE} fontSize={16} fontWeight={"600"}>
                  {isShowSalary ? "Hide" : "Show"}
                </Text>
                <Ionicons
                  name={isShowSalary ? "eye-off" : "eye"}
                  size={24}
                  color={DARK_BLUE}
                />
              </HStack>
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default TotalSalaryReport;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: "#DCE8F5",
    borderRadius: 24,
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

  priceText: {
    color: SUCCESS,
    fontWeight: "600",
    fontSize: 16,
  },
  timeText: {
    color: WARNING,
    fontWeight: "600",
    fontSize: 16,
  },
});
