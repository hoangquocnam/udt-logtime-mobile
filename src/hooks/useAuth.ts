import AsyncStorage from "@react-native-async-storage/async-storage";

const useToken = () => {
  const getAccessToken = () => {
    return AsyncStorage.getItem("aToken");
  };

  const getRefreshToken = () => {
    return AsyncStorage.getItem("rToken");
  };

  const setAccessToken = (token: string) => {
    return AsyncStorage.setItem("aToken", token);
  };

  const setRefreshToken = (token: string) => {
    return AsyncStorage.setItem("rToken", token);
  };

  return {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
  };
};

export default useToken;
