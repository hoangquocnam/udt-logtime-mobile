import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Mobile UDT TimeSheet",
  slug: "mobile-udt-timesheet",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icon.png",
  splash: {
    image: "./src/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.udt.mobile.timesheet"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.udt.mobile.timesheet",
  },
  web: {
    favicon: "./src/assets/favicon.png",
  },
  extra: {
    API_URL: process.env.API_URL,
    eas: {
      projectId: "52e1cfe1-5600-4a99-948d-2dde3345a8f8",
    },
  },
};

export default config;
