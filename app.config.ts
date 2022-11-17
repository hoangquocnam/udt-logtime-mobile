import { ExpoConfig } from 'expo/config';


const config : ExpoConfig = {
    name: "JetDevs-Mobile-App",
    slug: "jetdevs-mobile-app",
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
        
      },
    },
    
    web: {
      favicon: "./src/assets/favicon.png",
    },
};

export default config;
