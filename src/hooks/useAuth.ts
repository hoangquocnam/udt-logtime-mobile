import AsyncStorage from "@react-native-async-storage/async-storage";

const useToken = () => {
  const getAccessToken = () => {
    return AsyncStorage.getItem("aToken");
  };

  const getAccessTokenV2 = () => {
    return AsyncStorage.getItem("aTokenV2");
  };

  const getRefreshToken = () => {
    return AsyncStorage.getItem("rToken");
  };

  const getRefreshTokenV2 = () => {
    return AsyncStorage.getItem("rTokenV2");
  };

  const setAccessToken = (token: string) => {
    return AsyncStorage.setItem("aToken", token);
  };

  const setAccessTokenV2 = (token: string) => {
    return AsyncStorage.setItem("aTokenV2", token);
  };

  const setRefreshToken = (token: string) => {
    return AsyncStorage.setItem("rToken", token);
  };

  const setRefreshTokenV2 = (token: string) => {
    return AsyncStorage.setItem("rTokenV2", token);
  };

  return {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,

    getAccessTokenV2,
    getRefreshTokenV2,
    setAccessTokenV2,
    setRefreshTokenV2,
  };
};

export default useToken;
