import { COMPANY_URL } from "../api/router";
import * as Application from "expo-application";
import moment from "moment";
import flatMap from "lodash/flatMap";
import isEmpty from "lodash/isEmpty";

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getFullName(
  firstName?: string,
  lastName?: string,
  middleName?: string
): string {
  let nameArray: (string | undefined)[] = [firstName, middleName, lastName];
  nameArray = nameArray.filter((name) => name);

  return nameArray.join(" ");
}

export const getImageUrl = (image?: string) => {
  return image
    ? `${COMPANY_URL}/images/${image}`
    : `https://via.placeholder.com/150`;
};

export const formatCash = (num: number) => {
  // split by dot
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const formatDecimal = (num: number) => {
  return num.toLocaleString("it-IT", { minimumFractionDigits: 2 });
};

export const toCapitalizeFirstLetter = (str: string): string => {
  if (!str?.length) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToDecimalString = (
  num: number | string,
  forceShowDecimal: boolean = true,
  numDecimals: number = 2,
  removeZeroRedundancy: boolean = true,
  replaceComma: boolean = true
): string => {
  try {
    let convertedNumber: string | undefined = "";
    if (typeof num === "number") {
      if (num % 1 === 0 && !forceShowDecimal) {
        if (removeZeroRedundancy && numDecimals !== null) {
          return (
            Math.round(num * Math.pow(10, numDecimals)) /
            Math.pow(10, numDecimals)
          ).toString();
        }
        return num.toString();
      }
      convertedNumber =
        numDecimals !== null
          ? num.toFixed(numDecimals).toString()
          : num.toString();
    } else if (typeof num === "string") {
      let parsedFloat = num ? parseFloat(num.replace(/,/g, "")) : undefined;
      convertedNumber =
        numDecimals !== null && parsedFloat
          ? (
              Math.round(parsedFloat * Math.pow(10, numDecimals)) /
              Math.pow(10, numDecimals)
            ).toString()
          : parsedFloat?.toString();
    }

    if (!convertedNumber) return "";

    // Add commas every 3 digits for the part of the number before the decimal points
    const parts = convertedNumber?.toString()?.split(".");
    replaceComma && (parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    if (removeZeroRedundancy && parts[1] && parts[1].endsWith("0")) {
      parts[1] = parts[1].replace(/0+$/, "");
      if (parts[1] === "") return parts[0];
    }
    return parts.join(".");
  } catch (error) {
    console.error("convertToDecimalString | ", error);
    return "";
  }
};

export const toStartCase = (str: string): string => {
  if (str && typeof str === "string") {
    return str
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return "";
};

// used for normalizing array of chart data values
// mapping from min - max value of chart data, to 1 - 100
// needed for applying linear gradient to chart
export const normalizeChartData = (
  chartData,
  minOutRange = 1,
  maxOutRange = 100
) => {
  if (
    Array.isArray(chartData) &&
    chartData?.every((item) => typeof item === "number")
  ) {
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    if (max === min) {
      return chartData;
    }
    return chartData.map(
      (item) =>
        ((item - min) * (maxOutRange - minOutRange)) / (max - min) + minOutRange
    );
  }
  return chartData;
};

export const getChartDataPoints = (data) => {
  if (data) {
    const chartString = JSON.stringify(data);
    const chartData = JSON.parse(chartString);
    return flatMap(chartData, (point) => point.c);
  }

  return [];
};

export const timeDistance = (date: Date): string => {
  const now = new Date();
  const then = new Date(date);
  // @ts-ignore
  const diff = now - then;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds}s`;
  }
};

export const APP_VERSION_STRING = `v${Application.nativeApplicationVersion} (${Application.nativeBuildVersion})`;

export const checkValidArray = <T>(array: T[] | null | undefined): boolean => {
  return array ? Array.isArray(array) && array.length > 0 : false;
};

export const getValidArray = <T>(array?: T[]): T[] => {
  return checkValidArray(array) ? array || [] : [];
};

export const getTempShortName = (stockName: string): string => {
  if (!stockName) {
    return "";
  }

  const tempName = stockName.substring(0, stockName.search(/,? Inc/g));
  return tempName === "" ? stockName : tempName;
};

const VALID_USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export const isValidUsername = (username: string): boolean => {
  if (isEmpty(username)) return false;
  if (!VALID_USERNAME_REGEX.test(username)) return false;
  return true;
};

export const abs = (num: number): number => {
  return Math.abs(num);
};

export const removeAsyncStorageAll: () => Promise<boolean> = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error("removeAsyncStorageAll | ", e);
    return false;
  }
};

export const removeAsyncStorageExcept: (
  keys: string[]
) => Promise<boolean> = async (keys) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter((key) => !keys.includes(key));
    await AsyncStorage.multiRemove(keysToRemove);
    return true;
  } catch (e) {
    console.error("removeAsyncStorageExcept | ", e);
    return false;
  }
};

export const removeAsyncStorageWith: (
  keys: string[]
) => Promise<boolean> = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (e) {
    console.error("removeAsyncStorageKeys | ", e);
    return false;
  }
};
